import { ChartHelper } from "../../../utils/chart-helper";
import { DeltaIndicator } from '../indicator';
import { MathUtils } from '../../../utils/math-utils';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class OneYearTargetEstimationIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new OneYearTargetEstimationIndicator();

    public static get singleton(): OneYearTargetEstimationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y Est', '1Y Estimation');
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        if (!assetData?.estimation?.averageTarget || !chart?.entries) {
            return null;
        }
        return MathUtils.calculateDelta(assetData.estimation.averageTarget, ChartHelper.lastDay(chart).close);
    }

}