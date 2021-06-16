import { NumberIndicator } from './indicator';
import { PortfolioAsset } from '../portfolio';
import { Asset } from '../asset';
import { Chart } from '../chart';

export class AllocationPercentIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AllocationPercentIndicator();

    public static get singleton(): AllocationPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc', false);

    }

    compute(chart: Chart, asset: Asset, portfolioAsset: PortfolioAsset): number {
        return portfolioAsset.allocationPercent;
    }

}