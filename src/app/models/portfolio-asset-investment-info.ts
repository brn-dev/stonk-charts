
export class PortfolioAssetInvestmentInfo {
    public allocationAmount: number;
    public allocationPercent: number;
    public averageOpen: number;
    public averageLeverage: number;

    constructor(allocationAmount: number, allocationPercent: number, averageOpen: number, averageLeverage: number) {
        this.allocationAmount = allocationAmount;
        this.allocationPercent = allocationPercent;
        this.averageOpen = averageOpen;
        this.averageLeverage = averageLeverage;
    }

    get exposure(): number {
        return this.allocationAmount * this.averageLeverage;
    }
}
