import { DeltaIndicator } from './indicator';
import { PortfolioAsset } from '../portfolio';
import { Asset } from '../asset';
import { Chart } from '../chart';
import { ChartHelper } from '../../utils/chart-helper';

export class ProfitLossIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new ProfitLossIndicator();

    public static get singleton(): ProfitLossIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('P/L');
    }

    compute(chart: Chart, asset: Asset, portfolioAsset: PortfolioAsset): number {
        if (!chart?.entries || !portfolioAsset?.averageOpen) {
            return null;
        }
        return ChartHelper.calculateDelta(ChartHelper.lastDay(chart).close, portfolioAsset.averageOpen);
    }

}
