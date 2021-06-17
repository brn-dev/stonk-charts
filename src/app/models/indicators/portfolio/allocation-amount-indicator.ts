import { Indicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';

export class AllocationAmountIndicator extends Indicator<string> {

    private static SINGLETON_INSTANCE = new AllocationAmountIndicator();

    public static get singleton(): AllocationAmountIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc $', 'Allocation $', false);

    }

    compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): string {
        if (!assetInvestmentInfo?.allocationAmount) {
            return null;
        }
        return `${assetInvestmentInfo.allocationAmount}$`;
    }

}