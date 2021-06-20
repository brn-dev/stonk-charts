import { NumberIndicator } from '../indicator';
import { Asset } from '../../asset';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { AssetData } from '../../asset-data/asset-data';

export class AllocationPercentIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AllocationPercentIndicator();

    public static get singleton(): AllocationPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc %', 'Allocation %', false);

    }

    public compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.allocationPercent ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.toPercent(computationResult)} %`;
    }

}