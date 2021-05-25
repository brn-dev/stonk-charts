import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YahooChartApiConverter } from '../../api-converters/yahoo-chart-api-converter';
import { Asset } from '../../models/asset';
import { Chart } from '../../models/chart';
import { YahooChartApiResult } from '../../models/yahoo-chart-api-result';
import { FileService } from '../file.service';
import { ApiService } from './api.service';

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

    private readonly configFileName = "_yahoo-api-config.json";

    private readonly config: YahooApiConfig;

    constructor(
        private http: HttpClient,
        fileService: FileService
    ) {
        this.config = fileService.readJsonFromFile<YahooApiConfig>(this.configFileName)
    }

    public async fetchChartFor(asset: Asset): Promise<Chart> {
        const result = await this.http.get<YahooChartApiResult>(
            this.getUrlForSymbol(asset.symbol),
            {
                headers: {
                    "x-rapidapi-key": this.config.rapidapiKey,
                    "x-rapidapi-host": this.config.rapidapiHost
                }
            }
        ).toPromise();

        return YahooChartApiConverter.convert(result);
    }

    private getUrlForSymbol(symbol: string) {
        return `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=${this.config.interval}&symbol=${symbol}&range=${this.config.range}&region=US`;
    }
}
