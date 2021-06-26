import { PercentIndicator } from '../indicator';
import { Asset } from '../../asset';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { AssetData } from '../../asset-data/asset-data';
import { ColorPalettes } from '../../color-palettes';

export class AllocationPercentIndicator extends PercentIndicator {

    private static SINGLETON_INSTANCE = new AllocationPercentIndicator();

    public static get singleton(): AllocationPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc %', 'Allocation %', ColorPalettes.POSITIVE_ONLY_COLOR_MAP, null);

    }

    public compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.allocationPercent ?? null;
    }

}