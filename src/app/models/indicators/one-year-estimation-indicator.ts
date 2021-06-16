import { ChartHelper } from "../../utils/chart-helper";
import { Asset } from "../asset";
import { Chart } from "../chart";
import { DeltaIndicator } from "./indicator";

export class OneYearEstimationIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new OneYearEstimationIndicator();

    public static get singleton(): OneYearEstimationIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('1Y Est');
    }

    public compute(chart: Chart, asset: Asset): number {
        if (!asset.oneYearEstimation || !chart?.entries) {
            return null;
        }
        return ChartHelper.calculateDelta(asset.oneYearEstimation, ChartHelper.lastDay(chart).close);
    }

}