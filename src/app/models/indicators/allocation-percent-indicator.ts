import { NumberIndicator } from './indicator';
import { Asset } from '../asset';
import { Chart } from '../chart';
import { PortfolioAssetInvestmentInfo } from '../portfolio-asset-investment-info';

export class AllocationPercentIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AllocationPercentIndicator();

    public static get singleton(): AllocationPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc', false);

    }

    compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo.allocationPercent;
    }

}