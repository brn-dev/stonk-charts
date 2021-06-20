import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { ApiService } from './api/api.service';
import { FileService } from './file.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { FilterService } from './filter.service';
import { Asset } from '../models/asset';
import { AssetService } from './asset.service';

@Injectable({
    providedIn: 'root'
})
export class ChartCacheService {

    private readonly BASE_PATH = 'assets/';

    private readonly STAGGER_MILLIS = 500;

    private assetChartCache = new Map<string, Chart>();

    public $assetUpdated = new Subject<Asset>();

    constructor(
        private fileService: FileService,
        private assetService: AssetService,
        private apiService: ApiService,
        private filterService: FilterService
    ) {
        this.loadForAllAssets();
    }

    public setForAsset(asset: Asset, chart: Chart): void {
        this.assetChartCache.set(asset.symbol, chart);
        this.saveForAsset(asset, chart);
        this.$assetUpdated.next(asset);
    }

    public getForAsset(asset: Asset): Chart {
        return this.assetChartCache.get(asset.symbol);
    }

    public fetchAsset(asset: Asset): void {
        this.fetchAssets([asset]);
    }

    public fetchAssets(assets: Asset[]): void {
        const assetsToFetchCount = assets.length;
        let finishedFetchingCounter = 0;

        for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];

            if (asset.unavailable) {
                finishedFetchingCounter++;
                console.log(`skipping fetching ${asset.symbol} - unavailable`);
                continue;
            }

            setTimeout(async () => {
                console.log(`fetching ${asset.symbol}`);

                const chart = await this.apiService.fetchChartFor(asset);
                this.setForAsset(asset, chart);

                console.log(`finished fetching ${asset.symbol}`);

                finishedFetchingCounter++;
                if (finishedFetchingCounter === assetsToFetchCount) {
                    console.log('fetch finished');
                }
            }, this.STAGGER_MILLIS * i);
        }
    }

    public fetchAssetsOlderThanDays(days: number): void {
        const assetsToFetch: Asset[] = [];
        const past = moment().subtract(days, 'd');

        for (const asset of this.filterService.filteredAssets) {
            if (!this.assetChartCache.has(asset.symbol) || this.assetChartCache.get(asset.symbol) === null) {
                assetsToFetch.push(asset);
                continue;
            }

            const chart = this.assetChartCache.get(asset.symbol);
            const latestEntry = chart.entries[chart.entries.length - 1];
            const mom = moment(latestEntry.timestamp);

            if (mom.isSameOrBefore(past, 'd')) {
                assetsToFetch.push(asset);
            }
        }

        this.fetchAssets(assetsToFetch);
    }

    private saveForAsset(asset: Asset, chart: Chart) {
        const fileName = this.getFileNameForAsset(asset);
        this.fileService.writeJsonToFile(fileName, chart);
    }

    private loadForAsset(asset: Asset) {
        const fileName = this.getFileNameForAsset(asset);
        if (this.fileService.doesExist(fileName)) {
            this.assetChartCache.set(
                asset.symbol,
                this.fileService.readJsonFromFile<Chart>(fileName)
            );
        } else {
            this.assetChartCache.set(asset.symbol, null);
        }
    }

    private loadForAllAssets() {
        for (const asset of this.assetService.assets) {
            this.loadForAsset(asset);
        }
    }

    private getFileNameForAsset(asset: Asset) {
        return `${this.BASE_PATH}${asset.symbol}.json`;
    }
}
