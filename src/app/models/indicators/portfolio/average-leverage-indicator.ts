import { NumberIndicator } from '../indicator';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { ColorPalettes } from '../../color-palettes';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class AverageLeverageIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AverageLeverageIndicator();

    public static get singleton(): AverageLeverageIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super(
            'Lev',
            'Leverage',
            false,
            ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
            null
        );
    }

    public compute(assetData: FullAssetData): number {
        return assetData.portfolioInfo?.averageLeverage ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `X${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}`;
    }

}