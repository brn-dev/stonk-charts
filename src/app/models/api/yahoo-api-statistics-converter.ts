import { AssetStatistics } from '../asset-data/asset-statistics';
import { YahooApiGetStatisticsResult } from './yahoo-api-get-statistics-result';

export class YahooApiStatisticsConverter {

    public static convert(statisticsResult: YahooApiGetStatisticsResult): [string, AssetStatistics] {
        return [
            statisticsResult.symbol,
            {
                marketCap: statisticsResult.summaryDetail.marketCap?.raw ?? null,
                enterpriseValue: statisticsResult.defaultKeyStatistics.enterpriseValue?.raw ?? null,

                // Valuation Measures
                trailingPE: statisticsResult.summaryDetail.trailingPE?.raw ?? null,
                forwardPE: statisticsResult.summaryDetail.forwardPE?.raw ??
                    statisticsResult.defaultKeyStatistics.forwardPE?.raw ?? null,
                pegRatio: statisticsResult.defaultKeyStatistics.pegRatio?.raw ?? null,
                priceToSalesRatio: statisticsResult.summaryDetail.priceToSalesTrailing12Months?.raw ?? null,
                priceToBookRatio: statisticsResult.defaultKeyStatistics.priceToBook?.raw ?? null,
                evToRevenue: statisticsResult.defaultKeyStatistics.enterpriseToRevenue?.raw ?? null,
                evToEbitda: statisticsResult.defaultKeyStatistics.enterpriseToEbitda?.raw ?? null,

                // Profitability
                profitMargin: statisticsResult.financialData.profitMargins?.raw ?? null,
                operatingMargin: statisticsResult.financialData.operatingMargins?.raw ?? null,

                // Management Effectiveness
                returnOnAssets: statisticsResult.financialData.returnOnAssets?.raw ?? null,
                returnOnEquity: statisticsResult.financialData.returnOnEquity?.raw ?? null,

                // Income Statement
                revenueGrowth: statisticsResult.financialData.revenueGrowth?.raw ?? null,
                earningsGrowth: statisticsResult.financialData.earningsGrowth?.raw ?? null,

                // Share Statistics
                shortPercent: statisticsResult.defaultKeyStatistics.shortPercentOfFloat?.raw ??
                    statisticsResult.defaultKeyStatistics.sharesPercentSharesOut.raw ?? null,

                // Dividends
                trailingDividendYield: statisticsResult.summaryDetail.trailingAnnualDividendYield?.raw ?? null,
                forwardDividendYield: statisticsResult.summaryDetail.dividendYield?.raw ?? null,
                dividendPayoutRatio: statisticsResult.summaryDetail.payoutRatio?.raw ?? null,
            }
        ];
    }

}
