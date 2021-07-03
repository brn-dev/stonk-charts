export interface YahooApiGetChartsResult {
    chart: YahooApiGetChartsResultChart;
}

export interface YahooApiGetChartsResultChart {
    result: YahooApiGetChartsResultChartResult[];
    error?: any;
}

export interface YahooApiGetChartsResultChartResult {
    meta: YahooApiGetChartsResultMeta;
    timestamp: number[];
    comparisons: YahooApiGetChartsResultComparison[];
    indicators: YahooApiGetChartsResultIndicators;
}

export interface YahooApiGetChartsResultMeta {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    dataGranularity: string;
    range: string;
    validRanges: string[];
}

export interface YahooApiGetChartsResultComparison {
    symbol: string;
    high: any[];
    low: any[];
    chartPreviousClose: number;
    close: any[];
    open: any[];
}

export interface YahooApiGetChartsResultIndicators {
    quote: YahooApiGetChartsResultQuotes[];
    adjclose: YahooApiGetChartsResultAdjclose[];
}

export interface YahooApiGetChartsResultQuotes {
    high: number[];
    open: number[];
    close: number[];
    low: number[];
    volume: number[];
}

export interface YahooApiGetChartsResultAdjclose {
    adjclose: number[];
}

