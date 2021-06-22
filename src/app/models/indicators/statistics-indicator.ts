import { NumberIndicator } from './indicator';
import { AssetData } from '../asset-data/asset-data';
import { AssetStatistics } from '../asset-data/asset-statistics';
import { NumberFormatUtils } from '../../utils/number-format-utils';

export class StatisticsIndicator extends NumberIndicator {

    public static readonly marketCapIndicator = new StatisticsIndicator(
        'marketCap',
        'Cap',
        'Market Cap',
        false
    );

    public static readonly enterpriseValueIndicator = new StatisticsIndicator(
        'enterpriseValue',
        'EV',
        'Enterprise Value',
        false
    );

    public static readonly trailingPEIndicator = new StatisticsIndicator(
        'trailingPE',
        'tP/E',
        'tr. Price/Earning',
        false
    );

    public static readonly forwardPEIndicator = new StatisticsIndicator(
        'forwardPE',
        'fP/E',
        'fw. Price/Earning',
        false
    );

    public static readonly pegRatioIndicator = new StatisticsIndicator(
        'pegRatio',
        'PEG',
        'PEG Ratio',
        false
    );

    public static readonly priceToSalesIndicator = new StatisticsIndicator(
        'priceToSalesRatio',
        'P/S',
        'Price/Sales',
        false
    );

    public static readonly priceToBookIndicator = new StatisticsIndicator(
        'priceToBookRatio',
        'P/B',
        'Price/Book',
        false
    );

    public static readonly evToRevenueIndicator = new StatisticsIndicator(
        'evToRevenue',
        'EV/Rev',
        'EV/Revenue',
        false
    );

    public static readonly evToEbitdaIndicator = new StatisticsIndicator(
        'evToEbitda',
        'EV/EBITDA',
        'EV/EBITDA',
        false
    );

    public static readonly profitMarginIndicator = new StatisticsIndicator(
        'profitMargin',
        'Profit M.',
        'Profit Margin',
        true
    );

    public static readonly operatingMarginIndicator = new StatisticsIndicator(
        'operatingMargin',
        'Op. M.',
        'Operating Margin',
        true
    );

    public static readonly returnOnAssetsIndicator = new StatisticsIndicator(
        'returnOnAssets',
        'RoA',
        'Return on Assets',
        true
    );

    public static readonly returnOnEquityIndicator = new StatisticsIndicator(
        'returnOnEquity',
        'RoE',
        'Return on Equity',
        true
    );

    public static readonly revenueGrowthIndicator = new StatisticsIndicator(
        'revenueGrowth',
        'Rev. Gr.',
        'Rev. Growth',
        true
    );

    public static readonly earningsGrowthIndicator = new StatisticsIndicator(
        'earningsGrowth',
        'Earn. Gr.',
        'Earn. Growth',
        true
    );

    public static readonly shortPercentIndicator = new StatisticsIndicator(
        'shortPercent',
        'Short %',
        'Short %',
        true
    );

    public static readonly trailingDividendYieldIndicator = new StatisticsIndicator(
        'trailingDividendYield',
        'tDY',
        'tr. Divi. Yield',
        true
    );

    public static readonly forwardDividendYieldIndicator = new StatisticsIndicator(
        'forwardDividendYield',
        'fDY',
        'fw. Divi. Yield',
        true
    );

    public static readonly dividendPayoutRatioIndicator = new StatisticsIndicator(
        'dividendPayoutRatio',
        'DPR',
        'Divi. Payout Ratio',
        true
    );

    private constructor(
        private readonly field: keyof AssetStatistics,
        shortDescription: string,
        longDescription: string,
        isDelta: boolean
    ) {
        super(shortDescription, longDescription, isDelta);
    }

    public compute(assetData: AssetData): number {
        if (!assetData?.statistics) {
            return null;
        }
        return assetData.statistics[this.field];
    }

    public toDisplayFormat(computationResult: number): string {
        if (computationResult !== 0 && !computationResult) {
            return null;
        }
        return NumberFormatUtils.format(computationResult);
    }

}
