import { ChartHelper } from "../../../utils/chart-helper";
import { DeltaIndicator } from '../indicator';
import { MathUtils } from '../../../utils/math-utils';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class OneYearLowEstimationIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new OneYearLowEstimationIndicator();

    public static get singleton(): OneYearLowEstimationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y Low Est', '1Y Low Estimation');
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        if (!assetData?.estimation?.lowTarget || !chart?.entries) {
            return null;
        }
        return MathUtils.calculateDelta(assetData.estimation.lowTarget, ChartHelper.lastDay(chart).close);
    }

}