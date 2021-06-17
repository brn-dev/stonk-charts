import { DeltaIndicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { ChartHelper } from '../../../utils/chart-helper';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';

export class ProfitLossIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new ProfitLossIndicator();

    public static get singleton(): ProfitLossIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('P/L', 'Profit/Loss');
    }

    compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        // TODO
        if (!chart?.entries || !assetInvestmentInfo?.averageOpen) {
            return null;
        }
        const delta = ChartHelper.calculateDelta(ChartHelper.lastDay(chart).close, assetInvestmentInfo.averageOpen);
        return delta * (assetInvestmentInfo?.averageLeverage ?? 1);
    }

}
