import { ChartHelper } from "../../../utils/chart-helper";
import { DeltaIndicator } from '../indicator';
import { MathUtils } from '../../../utils/math-utils';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class OneYearHighEstimationIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new OneYearHighEstimationIndicator();

    public static get singleton(): OneYearHighEstimationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y High Est', '1Y High Estimation');
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        if (!assetData?.estimation?.highTarget || !chart?.entries) {
            return null;
        }
        return MathUtils.calculateDelta(assetData.estimation.highTarget, ChartHelper.lastDay(chart).close);
    }

}