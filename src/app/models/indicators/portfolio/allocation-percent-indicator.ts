import { Indicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';

export class AllocationPercentIndicator extends Indicator<string> {

    private static SINGLETON_INSTANCE = new AllocationPercentIndicator();

    public static get singleton(): AllocationPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc %', 'Allocation %', false);

    }

    compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): string {
        if (!assetInvestmentInfo?.allocationPercent) {
            return null;
        }
        return `${NumberFormatUtils.toPercent(assetInvestmentInfo.allocationPercent)} %`;
    }

}