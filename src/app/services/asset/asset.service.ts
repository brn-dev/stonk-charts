import { Injectable } from '@angular/core';
import { Asset } from '../../models/asset';
import { FileService } from '../file.service';
import { PortfolioService } from '../asset-data/portfolio.service';

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    public static readonly ASSETS_FILE_NAME = 'assets.json';

    public static readonly PORTFOLIO_TAG = 'Portfolio';

    private _assets: Asset[] = [];
    private _allUniqueTags: string[] = [];

    constructor(
        private fileService: FileService,
        private portfolioService: PortfolioService,
    ) {
        this.loadAssets();
    }

    get assets(): Asset[] {
        return this._assets;
    }

    get allUniqueTags(): string[] {
        return this._allUniqueTags;
    }

    public loadAssets(): void {
        const result = this.fileService.readJsonFromFile<Asset[]>(AssetService.ASSETS_FILE_NAME);

        for (const asset of result) {
            if (this.portfolioService.isInPortfolio(asset) && !asset.tags.includes(AssetService.PORTFOLIO_TAG)) {
                asset.tags.splice(0, 0, AssetService.PORTFOLIO_TAG);
            }
        }

        this._assets = result !== null ? result : [];
        this.calculateUniqueTags();
    }

    private calculateUniqueTags(): void {
        const tagsWithCount = new Map<string, number>();
        for (const asset of this.assets) {
            for (const tag of asset.tags) {
                if (tagsWithCount.has(tag)) {
                    tagsWithCount.set(tag, tagsWithCount.get(tag) + 1);
                } else {
                    tagsWithCount.set(tag, 1);
                }
            }
        }

        const arr = Array.from(tagsWithCount);

        arr.sort((a, b) => {
            const countA = a[1];
            const countB = b[1];

            if (countA > countB) {
                return -1;
            }
            return countB > countA ? 1 : 0;
        });


        this._allUniqueTags = arr.map(elem => elem[0]);
    }

}
