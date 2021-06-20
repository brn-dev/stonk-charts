import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { FileService } from './file.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { FilterService } from './filter.service';
import { Asset } from '../models/asset';
import { AssetService } from './asset.service';
import { AssetData } from '../models/asset-data/asset-data';

@Injectable({
    providedIn: 'root'
})
export class AssetDataCacheService {

    private readonly BASE_PATH = 'assets/';

    private assetDataCache = new Map<string, AssetData>();

    public $assetUpdated = new Subject<Asset>();

    constructor(
        private fileService: FileService,
        private assetService: AssetService,
        private apiService: ApiService,
        private filterService: FilterService
    ) {
        this.loadForAllAssets();
    }

    public setForSymbol(asset: Asset, data: AssetData): void {
        this.assetDataCache.set(asset.symbol, data);
        this.saveForAsset(asset, data);
        this.$assetUpdated.next(asset);
    }

    public getForAsset(asset: Asset): AssetData {
        return this.assetDataCache.get(asset.symbol);
    }

    public fetchAsset(asset: Asset): void {
        this.fetchAssets([asset]);
    }

    public fetchAssets(assets: Asset[]): void {
        assets = assets.filter(a => !a.unavailable);

        const assetMap = new Map<string, Asset>();
        for (const asset of assets) {
            assetMap.set(asset.symbol, asset);
        }

        this.apiService.fetchAssetDataFor(assets).subscribe(assetData => {
            this.setForSymbol(
                assetMap.get(assetData.symbol),
                assetData
            );
        });
    }

    public fetchAssetsOlderThanDays(days: number): void {
        const assetsToFetch: Asset[] = [];
        const past = moment().subtract(days, 'd');

        for (const asset of this.filterService.filteredAssets) {
            if (!this.assetDataCache.has(asset.symbol) || !this.assetDataCache.get(asset.symbol)?.chart) {
                assetsToFetch.push(asset);
                continue;
            }

            const chart = this.assetDataCache.get(asset.symbol).chart;
            const latestEntry = chart.entries[chart.entries.length - 1];
            const mom = moment(latestEntry.timestamp);

            if (mom.isSameOrBefore(past, 'd')) {
                assetsToFetch.push(asset);
            }
        }

        this.fetchAssets(assetsToFetch);
    }

    private saveForAsset(asset: Asset, data: AssetData) {
        const fileName = this.getFileNameForAsset(asset);
        this.fileService.writeJsonToFile(fileName, data);
    }

    private loadForAsset(asset: Asset) {
        const fileName = this.getFileNameForAsset(asset);
        if (this.fileService.doesExist(fileName)) {
            this.assetDataCache.set(
                asset.symbol,
                this.fileService.readJsonFromFile<AssetData>(fileName)
            );
        } else {
            this.assetDataCache.set(asset.symbol, null);
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
