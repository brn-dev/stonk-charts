import { Indicator, NumberIndicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';

export class AllocationAmountIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AllocationAmountIndicator();

    public static get singleton(): AllocationAmountIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc $', 'Allocation $', false);

    }

    public compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.allocationAmount ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}$`;
    }

}