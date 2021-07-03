import { PercentIndicator } from '../indicator';
import { ColorPalettes } from '../../color-palettes';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class ExposurePercentIndicator extends PercentIndicator {

    private static SINGLETON_INSTANCE = new ExposurePercentIndicator();

    public static get singleton(): ExposurePercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Exp %', 'Exposure %', ColorPalettes.POSITIVE_ONLY_COLOR_MAP, null);

    }

    public compute(assetData: FullAssetData): number {
        return assetData.portfolioInfo?.exposurePercent ?? null;
    }

}