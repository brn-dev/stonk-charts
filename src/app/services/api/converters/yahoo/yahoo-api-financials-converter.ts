import { YahooApiGetFinancialsResult } from '../../models/yahoo/yahoo-api-get-financials-result';
import { AssetFinancials } from '../../../../models/asset-data/asset-financials';

export class YahooApiFinancialsConverter {

    public static convert(apiResult: YahooApiGetFinancialsResult): AssetFinancials {
        return {
            yearlyRevenues: apiResult?.incomeStatementHistory.incomeStatementHistory.map(is => +is.totalRevenue.raw) ?? null,
            yearlyGrossProfits: apiResult?.incomeStatementHistory.incomeStatementHistory.map(is => +is.grossProfit.raw) ?? null,
            yearlyTotalAssets: apiResult?.balanceSheetHistory.balanceSheetStatements.map(bs => +bs.totalAssets.raw) ?? null,
            yearlyTotalLiabilities: apiResult?.balanceSheetHistory.balanceSheetStatements.map(bs => +bs.totalLiab.raw) ?? null,
        };
    }

}