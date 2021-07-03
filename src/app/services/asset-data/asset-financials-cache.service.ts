import { Injectable } from '@angular/core';
import { AssetFinancials } from '../../models/asset-data/asset-financials';
import { FileService } from '../file.service';
import { AbstractCacheService } from './abstract-cache.service';
import { ApiService } from '../api/api.service';
import { FilterService } from '../asset/filter.service';
import { AssetService } from '../asset/asset.service';
import { Asset } from '../../models/asset';

@Injectable({
    providedIn: 'root'
})
export class AssetFinancialsCacheService extends AbstractCacheService<AssetFinancials> {

    private static readonly BASE_PATH = 'financials/';

    constructor(
        private apiService: ApiService,
        private filterService: FilterService,
        fileService: FileService,
        assetService: AssetService,
    ) {
        super(
            fileService,
            assetService,
            AssetFinancialsCacheService.BASE_PATH,
        );
    }

    public fetchAssets(assets: Asset[]): void {
        this.apiService.fetchFinancialsFor(assets).subscribe(result => {
            this.setForAsset(
                result[0],
                result[1],
            );
        });
    }

    public fetchVisible(): void {
        this.fetchAssets(this.filterService.filteredAssets);
    }

}
