import { Injectable } from '@angular/core';
import { Asset } from '../../models/asset';
import { Indicator } from '../../models/indicators/indicator';
import { FullAssetDataService } from '../asset-data/full-asset-data.service';

type IndicatorResults = Map<Indicator<any>, any>;

@Injectable({
    providedIn: 'root'
})
export class IndicatorResultCacheService {

    private assetDataIndicatorResults = new Map<Asset, IndicatorResults>();

    constructor(
        private fullAssetDataService: FullAssetDataService,
    ) {
        fullAssetDataService.$assetUpdated.subscribe(a => this.assetDataIndicatorResults.delete(a));
    }

    public calculateResult<T>(
        asset: Asset,
        indicator: Indicator<T>
    ): T {
        if (this.assetDataIndicatorResults.has(asset) &&
            this.assetDataIndicatorResults.get(asset).has(indicator)
        ) {
            return this.assetDataIndicatorResults.get(asset).get(indicator);
        }

        const assetData = this.fullAssetDataService.getAssetData(asset);
        const calculationResult = indicator.compute(assetData);

        const indicatorResults = this.getOrCreateCacheFor(asset);
        indicatorResults.set(indicator, calculationResult);

        return calculationResult;
    }

    private getOrCreateCacheFor(asset: Asset): IndicatorResults {
        if (this.assetDataIndicatorResults.has(asset)) {
            return this.assetDataIndicatorResults.get(asset);
        }
        const newIndicatorResultsCache = new Map<Indicator<any>, any>();
        this.assetDataIndicatorResults.set(asset, newIndicatorResultsCache);
        return newIndicatorResultsCache;
    }
}
