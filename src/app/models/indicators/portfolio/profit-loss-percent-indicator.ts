import { DeltaIndicator } from '../indicator';
import { ChartHelper } from '../../../utils/chart-helper';
import { MathUtils } from '../../../utils/math-utils';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class ProfitLossPercentIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new ProfitLossPercentIndicator();

    public static get singleton(): ProfitLossPercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('P/L %', 'Profit/Loss %');
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData.chart;
        const portfolioInfo = assetData.portfolioInfo;
        if (!chart?.entries || !portfolioInfo) {
            return null;
        }
        const profitLoss = portfolioInfo.calculateProfitLoss(ChartHelper.lastDay(chart).close);
        const netAmount = portfolioInfo.allocationAmount + profitLoss;
        return MathUtils.calculateDelta(netAmount, portfolioInfo.allocationAmount);
    }

}
