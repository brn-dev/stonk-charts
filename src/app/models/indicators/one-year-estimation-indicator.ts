import { ChartHelper } from "../../utils/chart-helper";
import { Asset } from "../asset";
import { DeltaIndicator } from './indicator';
import { AssetData } from '../asset-data/asset-data';

export class OneYearEstimationIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new OneYearEstimationIndicator();

    public static get singleton(): OneYearEstimationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y Est', '1Y Estimation');
    }

    public compute(assetData: AssetData, asset: Asset): number {
        const chart = assetData?.chart ?? null;
        if (!asset.oneYearEstimation || !chart?.entries) {
            return null;
        }
        return ChartHelper.calculateDelta(asset.oneYearEstimation, ChartHelper.lastDay(chart).close);
    }

}