import { NumberIndicator } from '../indicator';
import { AssetStatistics } from '../../asset-data/asset-statistics';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { ColorPalettes } from '../../color-palettes';
import { FullAssetData } from '../../asset-data/full-asset-data';

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
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly forwardPEIndicator = new StatisticsIndicator(
        'forwardPE',
        'fP/E',
        'fw. Price/Earning',
        false,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly pegRatioIndicator = new StatisticsIndicator(
        'pegRatio',
        'PEG',
        'PEG Ratio',
        false,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly priceToSalesIndicator = new StatisticsIndicator(
        'priceToSalesRatio',
        'P/S',
        'Price/Sales',
        false,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly priceToBookIndicator = new StatisticsIndicator(
        'priceToBookRatio',
        'P/B',
        'Price/Book',
        false,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly evToRevenueIndicator = new StatisticsIndicator(
        'evToRevenue',
        'EV/Rev',
        'EV/Revenue',
        false,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly evToEbitdaIndicator = new StatisticsIndicator(
        'evToEbitda',
        'EV/EBITDA',
        'EV/EBITDA',
        false,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly profitMarginIndicator = new StatisticsIndicator(
        'profitMargin',
        'Profit M.',
        'Profit Margin',
        true,
        ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
        ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly operatingMarginIndicator = new StatisticsIndicator(
        'operatingMargin',
        'Op. M.',
        'Operating Margin',
        true,
        ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
        ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly returnOnAssetsIndicator = new StatisticsIndicator(
        'returnOnAssets',
        'RoA',
        'Return on Assets',
        true,
        ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
        ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly returnOnEquityIndicator = new StatisticsIndicator(
        'returnOnEquity',
        'RoE',
        'Return on Equity',
        true,
        ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
        ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly revenueGrowthIndicator = new StatisticsIndicator(
        'revenueGrowthYoy',
        'RG (yoy)',
        'Rev. Growth (yoy)',
        true,
        ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
        ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly earningsGrowthIndicator = new StatisticsIndicator(
        'earningsGrowthYoy',
        'EG (yoy)',
        'Earn. Growth (yoy)',
        true,
        ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
        ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
    );

    public static readonly shortPercentIndicator = new StatisticsIndicator(
        'shortPercent',
        'Short %',
        'Short %',
        true,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly trailingDividendYieldIndicator = new StatisticsIndicator(
        'trailingDividendYield',
        'tDY',
        'tr. Divi. Yield',
        true,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly forwardDividendYieldIndicator = new StatisticsIndicator(
        'forwardDividendYield',
        'fDY',
        'fw. Divi. Yield',
        true,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    public static readonly dividendPayoutRatioIndicator = new StatisticsIndicator(
        'dividendPayoutRatio',
        'DPR',
        'Divi. Payout Ratio',
        true,
        ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
        null,
    );

    private constructor(
        private readonly field: keyof AssetStatistics,
        shortDescription: string,
        longDescription: string,
        isPercent: boolean,
        positiveColorPalette: string[] | null,
        negativeColorPalette: string[] | null,

    ) {
        super(shortDescription, longDescription, isPercent, positiveColorPalette, negativeColorPalette);
    }

    public compute(assetData: FullAssetData): number {
        if (!assetData?.statistics) {
            return null;
        }
        const value = assetData.statistics[this.field] ?? null;

        if (!this.isValidNumber(value)) {
            return null;
        }

        return value;
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
