import { PortfolioPosition } from './portfolio';

export class PortfolioAssetInvestmentInfo {

    public readonly allocationAmount: number;
    public readonly allocationPercent: number;

    public readonly exposureAmount: number;
    public readonly exposurePercent: number;

    public readonly averageOpen: number;
    public readonly averageLeverage: number;

    constructor(
        public readonly positions: PortfolioPosition[],
        private readonly totalAmountInvested: number,
        private readonly totalExposure: number
    ) {
        this.allocationAmount = this.calculateAllocationAmount();
        this.allocationPercent = this.allocationAmount / totalAmountInvested;

        this.averageOpen = 0;
        this.averageLeverage = 0;
        for (const position of positions) {
            this.averageOpen += position.open * position.invested / this.allocationAmount;
            this.averageLeverage += position.leverage * position.invested / this.allocationAmount;
        }

        this.exposureAmount = this.allocationAmount * this.averageLeverage;
        this.exposurePercent = this.exposureAmount / totalExposure;
    }

    public calculateProfitLoss(quote: number): number {
        let sum = 0;
        for (const position of this.positions) {
            sum += (position.invested / position.open * quote - position.invested) * position.leverage;
        }
        return sum;
    }

    private calculateAllocationAmount(): number {
        let sum = 0;
        for (const position of this.positions) {
            sum += position.invested;
        }
        return sum;
    }

}
