import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FileService } from '../file.service';
import * as moment from 'moment';
import { FilterService } from '../asset/filter.service';
import { Asset } from '../../models/asset';
import { AssetService } from '../asset/asset.service';
import { BasicAssetData } from '../../models/asset-data/basic-asset-data';
import { AbstractCacheService } from './abstract-cache.service';

@Injectable({
    providedIn: 'root'
})
export class BasicAssetDataCacheService extends AbstractCacheService<BasicAssetData> {

    private static readonly BASE_PATH = 'basic-asset-data/';

    constructor(
        private apiService: ApiService,
        private filterService: FilterService,
        fileService: FileService,
        assetService: AssetService,
    ) {
        super(
            fileService,
            assetService,
            BasicAssetDataCacheService.BASE_PATH,
        );
    }

    public fetchAssets(assets: Asset[]): void {
        assets = assets.filter(a => !a.unavailable);

        const assetMap = new Map<string, Asset>();
        for (const asset of assets) {
            assetMap.set(asset.symbol, asset);
        }

        this.apiService.fetchAssetDataFor(assets).subscribe(assetData => {
            this.setForAsset(
                assetMap.get(assetData.symbol),
                assetData
            );
        });
    }

    public fetchAssetsOlderThanDays(days: number): void {
        const assetsToFetch: Asset[] = [];
        const past = moment().subtract(days, 'd');

        for (const asset of this.filterService.filteredAssets) {
            if (!this.cache.has(asset.symbol) || !this.cache.get(asset.symbol)?.chart) {
                assetsToFetch.push(asset);
                continue;
            }

            const chart = this.cache.get(asset.symbol).chart;
            const latestEntry = chart.entries[chart.entries.length - 1];
            const mom = moment(latestEntry.timestamp);

            if (mom.isSameOrBefore(past, 'd')) {
                assetsToFetch.push(asset);
            }
        }

        this.fetchAssets(assetsToFetch);
    }
}
