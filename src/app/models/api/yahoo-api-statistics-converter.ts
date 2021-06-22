import { AssetStatistics } from '../asset-data/asset-statistics';
import { YahooApiGetStatisticsResult } from './yahoo-api-get-statistics-result';

export class YahooApiStatisticsConverter {

    public static convert(statisticsResult: YahooApiGetStatisticsResult): [string, AssetStatistics] {
        return [
            statisticsResult.symbol,
            {
                marketCap: statisticsResult.summaryDetail.marketCap.raw,
                enterpriseValue: statisticsResult.defaultKeyStatistics.enterpriseValue.raw,

                // Valuation Measures
                trailingPE: statisticsResult.summaryDetail.trailingPE.raw,
                forwardPE: statisticsResult.summaryDetail.forwardPE.raw,
                pegRatio: statisticsResult.defaultKeyStatistics.pegRatio.raw,
                priceToSalesRatio: statisticsResult.summaryDetail.priceToSalesTrailing12Months.raw,
                priceToBookRatio: statisticsResult.defaultKeyStatistics.priceToBook.raw,
                evToRevenue: statisticsResult.defaultKeyStatistics.enterpriseToRevenue.raw,
                evToEbitda: statisticsResult.defaultKeyStatistics.enterpriseToEbitda.raw,

                // Profitability
                profitMargin: statisticsResult.financialData.profitMargins.raw,
                operatingMargin: statisticsResult.financialData.operatingMargins.raw,

                // Management Effectiveness
                returnOnAssets: statisticsResult.financialData.returnOnAssets.raw,
                returnOnEquity: statisticsResult.financialData.returnOnEquity.raw,

                // Income Statement
                revenueGrowth: statisticsResult.financialData.revenueGrowth.raw,
                earningsGrowth: statisticsResult.financialData.earningsGrowth.raw,

                // Share Statistics
                shortPercent: statisticsResult.defaultKeyStatistics.shortPercentOfFloat.raw,

                // Dividends
                trailingDividendYield: statisticsResult.summaryDetail.trailingAnnualDividendYield.raw,
                forwardDividendYield: statisticsResult.summaryDetail.dividendYield.raw,
                dividendPayoutRatio: statisticsResult.summaryDetail.payoutRatio.raw,
            }
        ];
    }

}
