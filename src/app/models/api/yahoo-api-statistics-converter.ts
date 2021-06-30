import { AssetStatistics } from '../asset-data/asset-statistics';
import { YahooApiGetStatisticsResult } from './yahoo-api-get-statistics-result';

export class YahooApiStatisticsConverter {

    public static convert(statisticsResult: YahooApiGetStatisticsResult): [string, AssetStatistics] {
        return [
            statisticsResult.symbol,
            {
                marketCap: this.convertNumber(statisticsResult.summaryDetail.marketCap?.raw),
                enterpriseValue: this.convertNumber(statisticsResult.defaultKeyStatistics.enterpriseValue?.raw),

                // Valuation Measures
                trailingPE: this.convertNumber(statisticsResult.summaryDetail.trailingPE?.raw),
                forwardPE: this.convertNumber(statisticsResult.summaryDetail.forwardPE?.raw ??
                    statisticsResult.defaultKeyStatistics.forwardPE?.raw),
                pegRatio: this.convertNumber(statisticsResult.defaultKeyStatistics.pegRatio?.raw),
                priceToSalesRatio: this.convertNumber(statisticsResult.summaryDetail.priceToSalesTrailing12Months?.raw),
                priceToBookRatio: this.convertNumber(statisticsResult.defaultKeyStatistics.priceToBook?.raw),
                evToRevenue: this.convertNumber(statisticsResult.defaultKeyStatistics.enterpriseToRevenue?.raw),
                evToEbitda: this.convertNumber(statisticsResult.defaultKeyStatistics.enterpriseToEbitda?.raw),

                // Profitability
                profitMargin: this.convertNumber(statisticsResult.financialData.profitMargins?.raw),
                operatingMargin: this.convertNumber(statisticsResult.financialData.operatingMargins?.raw),

                // Management Effectiveness
                returnOnAssets: this.convertNumber(statisticsResult.financialData.returnOnAssets?.raw),
                returnOnEquity: this.convertNumber(statisticsResult.financialData.returnOnEquity?.raw),

                // Income Statement
                revenueGrowth: this.convertNumber(statisticsResult.financialData.revenueGrowth?.raw),
                earningsGrowth: this.convertNumber(statisticsResult.financialData.earningsGrowth?.raw),

                // Share Statistics
                shortPercent: this.convertNumber(statisticsResult.defaultKeyStatistics.shortPercentOfFloat?.raw
                    ?? statisticsResult.defaultKeyStatistics.sharesPercentSharesOut?.raw),

                // Dividends
                trailingDividendYield: this.convertNumber(statisticsResult.summaryDetail.trailingAnnualDividendYield?.raw),
                forwardDividendYield: this.convertNumber(statisticsResult.summaryDetail.dividendYield?.raw),
                dividendPayoutRatio: this.convertNumber(statisticsResult.summaryDetail.payoutRatio?.raw),
            }
        ];
    }

    private static convertNumber(num: number): number {
        if (!num && num !== 0) {
            return null;
        }
        return +num;
    }

}
