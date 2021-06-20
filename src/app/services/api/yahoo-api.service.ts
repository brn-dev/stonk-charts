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
import { observable, Observable } from 'rxjs';

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
    private readonly API_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts';

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

                    const result = await this.http.get<YahooApiGetChartsResult>(
                        this.getApiUrlWithParams(assetsChunk),
                        {
                            headers: {
                                "x-rapidapi-key": this.config.rapidapiKey,
                                "x-rapidapi-host": this.config.rapidapiHost
                            }
                        }
                    ).toPromise();

                    const chartsBySymbol = YahooApiChartConverter.convert(result);

                    for (const symbol of Array.from(chartsBySymbol.keys())) {
                        o.next({
                            symbol,
                            chart: chartsBySymbol.get(symbol)
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

    private getApiUrlWithParams(assets: Asset[]) {
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

        return `${this.API_URL}?${paramsString}`;
    }
}
