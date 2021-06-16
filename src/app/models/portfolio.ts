export interface PortfolioAsset {
    symbol: string;
    allocationPercent: number;
    averageOpen?: number;
}

export interface Portfolio {
    amountInvested?: number;
    assets: PortfolioAsset[];  
}
