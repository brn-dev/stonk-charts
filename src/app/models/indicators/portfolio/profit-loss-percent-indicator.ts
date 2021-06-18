import { DeltaIndicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { ChartHelper } from '../../../utils/chart-helper';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';

export class ProfitLossPercentIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new ProfitLossPercentIndicator();

    public static get singleton(): ProfitLossPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('P/L %', 'Profit/Loss %');
    }

    public compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        if (!chart?.entries || !assetInvestmentInfo) {
            return null;
        }
        const profitLoss = assetInvestmentInfo.calculateProfitLoss(ChartHelper.lastDay(chart).close);
        const netAmount = assetInvestmentInfo.allocationAmount + profitLoss;
        return netAmount / assetInvestmentInfo.allocationAmount - 1;
    }

}
