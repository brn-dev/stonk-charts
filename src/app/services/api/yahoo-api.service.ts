/* eslint-disable @typescript-eslint/no-misused-promises */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YahooApiChartConverter } from './converters/yahoo/yahoo-api-chart-converter';
import { Asset } from '../../models/asset';
import { FileService } from '../file.service';
import { ApiService } from './api.service';
import { BasicAssetData } from '../../models/asset-data/basic-asset-data';
import { URLSearchParams } from 'url';
import { YahooApiGetChartsResult } from './models/yahoo/yahoo-api-get-charts-result';
import { Observable } from 'rxjs';
import { Chart } from '../../models/asset-data/chart';
import { AssetStatistics } from '../../models/asset-data/asset-statistics';
import { YahooApiGetStatisticsResult } from './models/yahoo/yahoo-api-get-statistics-result';
import { YahooApiStatisticsConverter } from './converters/yahoo/yahoo-api-statistics-converter';
import { AssetFinancials } from '../../models/asset-data/asset-financials';
import { YahooApiGetFinancialsResult } from './models/yahoo/yahoo-api-get-financials-result';
import { YahooApiFinancialsConverter } from './converters/yahoo/yahoo-api-financials-converter';

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
    private readonly GET_FINANCIALS_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials';

    private readonly CHUNK_SIZE = 3;
    private readonly BASIC_DATA_STAGGER_MILLIS = 1500;

    private readonly FINANCIALS_STAGGER_MILLIS = 300;

    private readonly config: YahooApiConfig;

    constructor(
        private http: HttpClient,
        fileService: FileService
    ) {
        this.config = fileService.readJsonFromFile<YahooApiConfig>(this.CONFIG_FILE_NAME);
    }

    public fetchAssetDataFor(assets: Asset[]): Observable<BasicAssetData> {
        return new Observable<BasicAssetData>((o) => {
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
                            chart: chartsBySymbol.get(symbol) ?? null,
                            statistics: statisticsBySymbol.get(symbol) ?? null,
                        });
                    }

                    console.log('finished fetching ' + chunkSymbols);
                    fetchFinishedCount += chartsBySymbol.size;

                    if (fetchFinishedCount === assets.length) {
                        console.log('fetch finished');
                        o.complete();
                    }
                }, this.BASIC_DATA_STAGGER_MILLIS * i / this.CHUNK_SIZE);
            }
        });
    }

    public fetchFinancialsFor(assets: Asset[]): Observable<[Asset, AssetFinancials]> {
        return new Observable((o) => {
            assets = assets.filter(a => !a.unavailable && this.isStock(a));

            for (let i = 0; i < assets.length; i++) {
                const asset = assets[i];
                setTimeout(async () => {
                    console.log('fetching financials for: ' + asset.symbol);

                    const yahooApiGetFinancialsResult = await this.http.get<YahooApiGetFinancialsResult>(
                        this.getFinancialsUrlForAsset(asset),
                        {
                            headers: this.getHeaders()
                        }
                    ).toPromise();

                    o.next([
                        asset,
                        YahooApiFinancialsConverter.convert(yahooApiGetFinancialsResult)
                    ]);

                    console.log('finished fetching financials for: ' + asset.symbol);
                }, this.FINANCIALS_STAGGER_MILLIS * i);
            }
            
        });
    }

    private async fetchCharts(assetsChunk: Asset[]): Promise<Map<string, Chart>> {
        if (assetsChunk.length > 3) {
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
        assets = assets.filter(a => this.isStock(a));

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

        const results = await Promise.all(Array.from(apiPromises.values()));

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

    private getFinancialsUrlForAsset(asset: Asset): string {
        const params = {
            symbol: asset.symbol
        };

        const searchParams = new URLSearchParams(params);
        const paramsString = searchParams.toString();

        return `${this.GET_FINANCIALS_URL}?${paramsString}`;
    }

    private getHeaders(): any {
        return {
            'x-rapidapi-key': this.config.rapidapiKey,
            'x-rapidapi-host': this.config.rapidapiHost
        };
    }

    private isStock(asset: Asset) {
        return asset.tags.includes('Stock') && !asset.tags.includes('ETF/Index');
    }
}
