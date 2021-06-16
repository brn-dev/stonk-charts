import { Injectable } from '@angular/core';
import { Portfolio, PortfolioAsset } from '../models/portfolio';
import { FileService } from './file.service';
import { Asset } from '../models/asset';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    public readonly PORTFOLIO_FILE_NAME = '_portfolio.json';

    private _portfolio: Portfolio;
    private _portfolioAssets = new Map<string, PortfolioAsset>();

    constructor(private fileService: FileService) {
        this.loadPortfolio();
    }

    get portfolio(): Portfolio {
        return this._portfolio;
    }

    get portfolioAssets(): PortfolioAsset[] {
        return Array.from(this._portfolioAssets.values());
    }

    public getPortolioInfoFor(asset: Asset): PortfolioAsset {
        return this._portfolioAssets.get(asset.symbol);
    }

    public loadPortfolio(): void {
        this._portfolio = this.fileService.readJsonFromFile<Portfolio>(this.PORTFOLIO_FILE_NAME);

        this._portfolioAssets.clear();
        for (const asset of this._portfolio.assets) {
            this._portfolioAssets.set(asset.symbol, asset);
        }
    }
}
