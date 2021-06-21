/* eslint-disable @typescript-eslint/no-misused-promises */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YahooApiChartConverter } from '../../models/api/yahoo-api-chart-converter';
import { Asset } from '../../models/asset';
import { FileService } from '../file.service';
import { ApiService } from './api.service';
import { AssetData } from '../../models/asset-data/asset-data';
import { URLSearchParams } from 'url';
import { YahooApiGetChartsResult } from '../../models/api/yahoo-api-get-charts-result';
import { Observable } from 'rxjs';
import { Chart } from '../../models/asset-data/chart';
import { AssetStatistics } from '../../models/asset-data/asset-statistics';
import { YahooApiGetStatisticsResult } from '../../models/api/yahoo-api-get-statistics-result';
import { YahooApiStatisticsConverter } from '../../models/api/yahoo-api-statistics-converter';

interface YahooApiConfig {
    rapidapiKey: string;
    rapidapiHost: string;
    interval: string;
    range: string;
}

@Injectable({
    providedIn: 'root'
})
export class YahooApiService implements ApiService {

    private readonly CONFIG_FILE_NAME = 'yahoo-api-config.json';

    private readonly GET_CHARTS_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts';
    private readonly GET_STATISTICS_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-statistics';

    private readonly CHUNK_SIZE = 3;
    private readonly STAGGER_MILLIS = 400;

    private readonly config: YahooApiConfig;

    constructor(
        private http: HttpClient,
        fileService: FileService
    ) {
        this.config = fileService.readJsonFromFile<YahooApiConfig>(this.CONFIG_FILE_NAME);
    }

    public fetchAssetDataFor(assets: Asset[]): Observable<AssetData> {
        return new Observable<AssetData>((o) => {
            assets = assets.filter(a => !a.unavailable);
            let fetchFinishedCount = 0;

            for (let i = 0; i < assets.length; i += this.CHUNK_SIZE) {
                const assetsChunk = assets.slice(i, i + this.CHUNK_SIZE);

                setTimeout(async () => {
                    const chunkSymbols = assetsChunk.map(a => a.symbol).join(', ');
                    console.log('fetching ' + chunkSymbols);

                    const chartsBySymbolPromise = this.fetchCharts(assetsChunk);
                    const statisticsBySymbolPromise = this.fetchStatistics(assetsChunk);

                    const [chartsBySymbol, statisticsBySymbol] =
                        await Promise.all([chartsBySymbolPromise, statisticsBySymbolPromise]);

                    for (const symbol of Array.from(chartsBySymbol.keys())) {
                        o.next({
                            symbol,
                            chart: chartsBySymbol.get(symbol),
                            statistics: statisticsBySymbol.get(symbol),
                        });
                    }

                    console.log('finished fetching ' + chunkSymbols);
                    fetchFinishedCount += chartsBySymbol.size;

                    if (fetchFinishedCount === assets.length) {
                        console.log('fetch finished');
                        o.complete();
                    }
                }, this.STAGGER_MILLIS * i / this.CHUNK_SIZE);
            }
        });
    }

    private async fetchCharts(assetsChunk: Asset[]): Promise<Map<string, Chart>> {
        if (assetsChunk.length > 0) {
            throw new Error('Can not fetch more than 3 charts at once!');
        }

        const result = await this.http.get<YahooApiGetChartsResult>(
            this.getChartsUrlWithParams(assetsChunk),
            {
                headers: this.getHeaders()
            }
        ).toPromise();

        return YahooApiChartConverter.convert(result);
    }

    private async fetchStatistics(assets: Asset[]): Promise<Map<string, AssetStatistics>> {
        const apiPromises: Promise<YahooApiGetStatisticsResult>[] = [];

        for (const asset of assets) {
            apiPromises.push(
                this.http.get<YahooApiGetStatisticsResult>(
                    this.getStatisticsUrlForAsset(asset),
                    {
                        headers: this.getHeaders()
                    }
                ).toPromise()
            );
        }

        const results = await Promise.all(apiPromises.values());

        const statisticsBySymbols = new Map<string, AssetStatistics>();

        for (const result of results) {
            const [symbol, statistics] = YahooApiStatisticsConverter.convert(result);
            statisticsBySymbols.set(symbol, statistics);
        }

        return statisticsBySymbols;
    }

    private getChartsUrlWithParams(assets: Asset[]): string {
        const params = {
            interval: this.config.interval,
            symbol: assets[0].symbol,
            range: this.config.range,
            comparisons: []
        };

        for (let i = 1; i < assets.length; i++) {
            params.comparisons.push(assets[i].symbol);
        }

        const searchParams = new URLSearchParams(params);
        const paramsString = searchParams.toString();

        return `${this.GET_CHARTS_URL}?${paramsString}`;
    }

    private getStatisticsUrlForAsset(asset: Asset): string {
        const params = {
            symbol: asset.symbol
        };

        const searchParams = new URLSearchParams(params);
        const paramsString = searchParams.toString();

        return `${this.GET_STATISTICS_URL}?${paramsString}`;
    }

    private getHeaders(): any {
        return {
            'x-rapidapi-key': this.config.rapidapiKey,
            'x-rapidapi-host': this.config.rapidapiHost
        };
    }
}
