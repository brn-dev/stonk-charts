import { Injectable } from '@angular/core';
import { Portfolio, PortfolioPosition } from '../models/portfolio';
import { FileService } from './file.service';
import { PortfolioAssetInvestmentInfo } from '../models/portfolio-asset-investment-info';
import { Asset } from '../models/asset';

// noinspection JSMethodCanBeStatic
@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    public readonly PORTFOLIO_FILE_NAME = 'portfolio.json';

    private _portfolio: Portfolio;
    private _portfolioMarkets = new Map<string, PortfolioAssetInvestmentInfo>();

    constructor(private fileService: FileService) {
        this.loadPortfolio();
    }

    get portfolio(): Portfolio {
        return this._portfolio;
    }

    public getInvestmentInfoForAsset(asset: Asset): PortfolioAssetInvestmentInfo {
        return this._portfolioMarkets.get(asset.symbol);
    }

    public loadPortfolio(): void {
        this._portfolio = this.fileService.readJsonFromFile<Portfolio>(this.PORTFOLIO_FILE_NAME);

        this._portfolioMarkets.clear();

        const totalAmountInvested = this.getTotalAmountInvested(this._portfolio.positions);
        const groupedPositions = this.groupPositions(this._portfolio.positions);
        for (const symbol of Array.from(groupedPositions.keys())) {
            this._portfolioMarkets.set(
                symbol,
                this.toPortfolioMarket(groupedPositions.get(symbol), totalAmountInvested)
            );
        }
    }

    private groupPositions(positions: PortfolioPosition[]): Map<string, PortfolioPosition[]> {
        const groupedPositions = new Map<string, PortfolioPosition[]>();
        for (const position of positions) {
            const symbol = position.symbol;
            if (groupedPositions.has(symbol)) {
                groupedPositions.get(symbol).push(position);
            } else {
                groupedPositions.set(symbol, [position]);
            }
        }
        return groupedPositions;
    }

    private toPortfolioMarket(
        marketPositions: PortfolioPosition[],
        totalAmountInvested: number
    ): PortfolioAssetInvestmentInfo {
        let amountInvestedInMarket = 0;
        for (const position of marketPositions) {
            amountInvestedInMarket += position.invested;
        }
        let averageOpen = 0;
        let averageLeverage = 0;
        for (const position of marketPositions) {
            averageOpen += position.open * position.invested / amountInvestedInMarket;
            averageLeverage += position.leverage * position.invested / amountInvestedInMarket;
        }

        const allocationPercent = amountInvestedInMarket / totalAmountInvested;

        return new PortfolioAssetInvestmentInfo(
            amountInvestedInMarket,
            allocationPercent,
            averageOpen,
            averageLeverage
        );
    }

    private getTotalAmountInvested(positions: PortfolioPosition[]): number {
        let sum = 0;
        for (const position of positions) {
            sum += position.invested;
        }
        return sum;
    }
}
