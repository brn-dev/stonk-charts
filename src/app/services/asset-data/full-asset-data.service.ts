import { Injectable } from '@angular/core';
import { Asset } from '../../models/asset';
import { FullAssetData } from '../../models/asset-data/full-asset-data';
import { BasicAssetDataCacheService } from './basic-asset-data-cache.service';
import { PortfolioService } from './portfolio.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FullAssetDataService {

    public readonly $assetUpdated = new Subject<Asset>();

    constructor(
        private basicAssetDataCacheService: BasicAssetDataCacheService,
        private portfolioService: PortfolioService
    ) {
        basicAssetDataCacheService.$assetUpdated.subscribe(a => this.$assetUpdated.next(a));
    }

    public getAssetData(asset: Asset): FullAssetData {
        const basicAssetData = this.basicAssetDataCacheService.getForAsset(asset);
        const portfolioInfo = this.portfolioService.getInvestmentInfoForAsset(asset);

        return {
            ...basicAssetData,
            asset,
            portfolioInfo,
        };
    }

}
