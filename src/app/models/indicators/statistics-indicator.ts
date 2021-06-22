import { NumberIndicator } from './indicator';
import { AssetData } from '../asset-data/asset-data';
import { AssetStatistics } from '../asset-data/asset-statistics';

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
        false
    );

    public static readonly operatingMarginIndicator = new StatisticsIndicator(
        'operatingMargin',
        'Op. M.',
        'Operating Margin',
        false
    );

    public static readonly returnOnAssetsIndicator = new StatisticsIndicator(
        'returnOnAssets',
        'RoA',
        'R. o. Assets',
        false
    );

    public static readonly returnOnEquityIndicator = new StatisticsIndicator(
        'returnOnEquity',
        'RoE',
        'R. o. Equity',
        false
    );

    public static readonly revenueGrowthIndicator = new StatisticsIndicator(
        'revenueGrowth',
        'Rev. Gr.',
        'Rev. Growth',
        false
    );

    public static readonly earningsGrowthIndicator = new StatisticsIndicator(
        'earningsGrowth',
        'Earn. Gr.',
        'Earn. Growth',
        false
    );

    public static readonly shortPercentIndicator = new StatisticsIndicator(
        'shortPercent',
        'Short %',
        'Short %',
        false
    );

    public static readonly trailingDividendYieldIndicator = new StatisticsIndicator(
        'trailingDividendYield',
        'tDY',
        'tr. Div. Yield',
        false
    );

    public static readonly forwardDividendYieldIndicator = new StatisticsIndicator(
        'forwardDividendYield',
        'fDY',
        'fw. Div. Yield',
        false
    );

    public static readonly dividendPayoutRatioIndicator = new StatisticsIndicator(
        'dividendPayoutRatio',
        'PR',
        'Div. Payout Ratio',
        false
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
        return assetData[this.field];
    }

    public toDisplayFormat(computationResult: number): string {
        return computationResult.toString();
    }

}
