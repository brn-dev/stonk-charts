import { PercentIndicator } from '../indicator';
import { ColorPalettes } from '../../color-palettes';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class AllocationPercentIndicator extends PercentIndicator {

    private static SINGLETON_INSTANCE = new AllocationPercentIndicator();

    public static get singleton(): AllocationPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc %', 'Allocation %', ColorPalettes.POSITIVE_ONLY_COLOR_MAP, null);

    }

    public compute(assetData: FullAssetData): number {
        return assetData.portfolioInfo?.allocationPercent ?? null;
    }

}