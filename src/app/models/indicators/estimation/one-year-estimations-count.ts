import { NumberIndicator } from '../indicator';
import { FullAssetData } from '../../asset-data/full-asset-data';
import { ColorPalettes } from '../../color-palettes';

export class OneYearEstimationsCount extends NumberIndicator {

    private static SINGLETON_INSTANCE = new OneYearEstimationsCount();

    public static get singleton(): OneYearEstimationsCount {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super(
            '# Est',
            'Estimations Count',
            false,
            ColorPalettes.POSITIVE_ONLY_COLOR_MAP,
            null
        );
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        if (!assetData?.estimation?.targets || !chart?.entries) {
            return null;
        }
        return assetData.estimation.targets.length;
    }

    public toDisplayFormat(computationResult: number): string {
        return computationResult.toString();
    }

}