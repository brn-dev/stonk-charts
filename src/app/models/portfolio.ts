export interface PortfolioPosition {
    symbol: string;
    isBuy: boolean;
    invested: number;
    open: number;
    leverage: number;
    fees: number;
}

export interface Portfolio {
    amountInvested?: number;
    // symbolMap: { [symbol: string]: string };
    positions: PortfolioPosition[];
}
