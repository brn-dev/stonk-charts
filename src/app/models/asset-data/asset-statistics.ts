
export interface AssetStatistics {
    marketCap: number;
    enterpriseValue: number;

    // Valuation Measures
    trailingPE: number;
    forwardPE: number;
    pegRatio: number;
    priceToSalesRatio: number;
    priceToBookRatio: number;
    evToRevenue: number;
    evToEbita: number;

    // Profitability
    profitMargin: number;
    operatingMargin: number;

    // Management Effectiveness
    returnOnAssets: number;
    returnOnEquity: number;

    // Income Statement
    revenueGrowth: number;
    earningsGrowth: number;

    // Share Statistics
    shortPercent: number;

    // Dividends
    trailingDividendYield: number;
    forwardDividendYield: number;
    dividendPayoutRatio: number;

}


