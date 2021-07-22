import { PercentIndicator } from '../indicator';
import { FullAssetData } from '../../asset-data/full-asset-data';
import { ColorPalettes } from '../../color-palettes';

export class OneYearEstimationAverageDeviationIndicator extends PercentIndicator {

    private static SINGLETON_INSTANCE = new OneYearEstimationAverageDeviationIndicator();

    public static get singleton(): OneYearEstimationAverageDeviationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y Est AD', '1Y Estimation AD', ColorPalettes.POSITIVE_ONLY_COLOR_MAP, null);
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        if (!assetData?.estimation?.averageDeviation || !chart?.entries) {
            return null;
        }
        return assetData.estimation.averageDeviation;
    }

}