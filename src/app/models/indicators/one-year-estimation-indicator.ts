import { ChartHelper } from "../../utils/chart-helper";
import { Asset } from "../asset";
import { DeltaIndicator } from './indicator';
import { BasicAssetData } from '../asset-data/basic-asset-data';
import { Calculator } from '../../utils/calculator';
import { FullAssetData } from '../asset-data/full-asset-data';

export class OneYearEstimationIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new OneYearEstimationIndicator();

    public static get singleton(): OneYearEstimationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y Est', '1Y Estimation');
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        const asset = assetData?.asset ?? null;
        if (!asset?.oneYearEstimation || !chart?.entries) {
            return null;
        }
        return Calculator.calculateDelta(asset.oneYearEstimation, ChartHelper.lastDay(chart).close);
    }

}