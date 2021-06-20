import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { Indicator } from '../models/indicators/indicator';
import { AssetDataCacheService } from './asset-data-cache.service';
import { PortfolioService } from './portfolio.service';
import { AssetData } from '../models/asset-data/asset-data';

type IndicatorResults = Map<Indicator<any>, any>;

@Injectable({
    providedIn: 'root'
})
export class IndicatorResultCacheService {

    // Using AssetData as key since if a new version of the AssetData arrives, it gets recalculated
    // TODO: maybe clean up old versions
    private assetDataIndicatorResults = new Map<AssetData, IndicatorResults>();

    constructor(
        private assetDataCacheService: AssetDataCacheService,
        private portfolioService: PortfolioService,
    ) {
    }

    public calculateResult<T>(
        asset: Asset,
        indicator: Indicator<T>
    ): T {
        const assetData = this.assetDataCacheService.getForAsset(asset);
        const assetInvestmentInfo = this.portfolioService.getInvestmentInfoForAsset(asset);

        if (this.assetDataIndicatorResults.has(assetData) &&
            this.assetDataIndicatorResults.get(assetData).has(indicator)
        ) {
            return this.assetDataIndicatorResults.get(assetData).get(indicator);
        }
        const calculationResult = indicator.compute(assetData, asset, assetInvestmentInfo);

        const indicatorResults = this.getOrCreateCacheFor(assetData);
        indicatorResults.set(indicator, calculationResult);

        return calculationResult;
    }

    private getOrCreateCacheFor(assetData: AssetData): IndicatorResults {
        if (this.assetDataIndicatorResults.has(assetData)) {
            return this.assetDataIndicatorResults.get(assetData);
        }
        const newIndicatorResultsCache = new Map<Indicator<any>, any>();
        this.assetDataIndicatorResults.set(assetData, newIndicatorResultsCache);
        return newIndicatorResultsCache;
    }
}
