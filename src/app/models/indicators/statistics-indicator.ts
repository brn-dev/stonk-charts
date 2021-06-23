import { NumberIndicator } from './indicator';
import { AssetData } from '../asset-data/asset-data';
import { AssetStatistics } from '../asset-data/asset-statistics';
import { NumberFormatUtils } from '../../utils/number-format-utils';
import { ColorMaps } from '../color-maps';

export class StatisticsIndicator extends NumberIndicator {

    public static readonly marketCapIndicator = new StatisticsIndicator(
        'marketCap',
        'Cap',
        'Market Cap',
        false,
        null,
        null,
    );

    public static readonly enterpriseValueIndicator = new StatisticsIndicator(
        'enterpriseValue',
        'EV',
        'Enterprise Value',
        false,
        null,
        null,
    );

    public static readonly trailingPEIndicator = new StatisticsIndicator(
        'trailingPE',
        'tP/E',
        'tr. Price/Earning',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly forwardPEIndicator = new StatisticsIndicator(
        'forwardPE',
        'fP/E',
        'fw. Price/Earning',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly pegRatioIndicator = new StatisticsIndicator(
        'pegRatio',
        'PEG',
        'PEG Ratio',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly priceToSalesIndicator = new StatisticsIndicator(
        'priceToSalesRatio',
        'P/S',
        'Price/Sales',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly priceToBookIndicator = new StatisticsIndicator(
        'priceToBookRatio',
        'P/B',
        'Price/Book',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly evToRevenueIndicator = new StatisticsIndicator(
        'evToRevenue',
        'EV/Rev',
        'EV/Revenue',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly evToEbitdaIndicator = new StatisticsIndicator(
        'evToEbitda',
        'EV/EBITDA',
        'EV/EBITDA',
        false,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly profitMarginIndicator = new StatisticsIndicator(
        'profitMargin',
        'Profit M.',
        'Profit Margin',
        true,
        ColorMaps.DELTA_POSITIVE_COLOR_MAP,
        ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly operatingMarginIndicator = new StatisticsIndicator(
        'operatingMargin',
        'Op. M.',
        'Operating Margin',
        true,
        ColorMaps.DELTA_POSITIVE_COLOR_MAP,
        ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly returnOnAssetsIndicator = new StatisticsIndicator(
        'returnOnAssets',
        'RoA',
        'Return on Assets',
        true,
        ColorMaps.DELTA_POSITIVE_COLOR_MAP,
        ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly returnOnEquityIndicator = new StatisticsIndicator(
        'returnOnEquity',
        'RoE',
        'Return on Equity',
        true,
        ColorMaps.DELTA_POSITIVE_COLOR_MAP,
        ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly revenueGrowthIndicator = new StatisticsIndicator(
        'revenueGrowth',
        'Rev. Gr.',
        'Rev. Growth',
        true,
        ColorMaps.DELTA_POSITIVE_COLOR_MAP,
        ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly earningsGrowthIndicator = new StatisticsIndicator(
        'earningsGrowth',
        'Earn. Gr.',
        'Earn. Growth',
        true,
        ColorMaps.DELTA_POSITIVE_COLOR_MAP,
        ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly shortPercentIndicator = new StatisticsIndicator(
        'shortPercent',
        'Short %',
        'Short %',
        true,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly trailingDividendYieldIndicator = new StatisticsIndicator(
        'trailingDividendYield',
        'tDY',
        'tr. Divi. Yield',
        true,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly forwardDividendYieldIndicator = new StatisticsIndicator(
        'forwardDividendYield',
        'fDY',
        'fw. Divi. Yield',
        true,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly dividendPayoutRatioIndicator = new StatisticsIndicator(
        'dividendPayoutRatio',
        'DPR',
        'Divi. Payout Ratio',
        true,
        ColorMaps.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    private constructor(
        private readonly field: keyof AssetStatistics,
        shortDescription: string,
        longDescription: string,
        isPercent: boolean,
        positiveColorMap: string[] | null,
        negativeColorMap: string[] | null,

    ) {
        super(shortDescription, longDescription, isPercent, positiveColorMap, negativeColorMap);
    }

    public compute(assetData: AssetData): number {
        if (!assetData?.statistics) {
            return null;
        }
        return assetData.statistics[this.field] ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (computationResult !== 0 && !computationResult) {
            return null;
        }

        if (this.isPercent) {
            return NumberFormatUtils.toPercentString(computationResult);
        }

        return NumberFormatUtils.format(computationResult);
    }

}
