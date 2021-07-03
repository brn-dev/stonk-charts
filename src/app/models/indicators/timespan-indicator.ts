import { ChartHelper } from "../../utils/chart-helper";
import { Timespan } from "../timespan";
import { DeltaIndicator } from './indicator';
import { Calculator } from '../../utils/calculator';
import { FullAssetData } from '../asset-data/full-asset-data';

export class TimespanIndicator extends DeltaIndicator {

    private static _timespanTimespanIndicatorMap = new Map<Timespan, TimespanIndicator>();

    public static get(timespan: Timespan): TimespanIndicator {
        if (this._timespanTimespanIndicatorMap.has(timespan)) {
            return this._timespanTimespanIndicatorMap.get(timespan);
        }

        const indicator = new TimespanIndicator(timespan);
        this._timespanTimespanIndicatorMap.set(timespan, indicator);
        return indicator;
    }

    private constructor(
        public timespan: Timespan
    ) {
        super(timespan.displayText, timespan.displayText);
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        const now = ChartHelper.lastDay(chart);
        const past = ChartHelper.getDayInPastFromTimespan(chart, this.timespan);

        if (!now?.close || !past?.close) {
            return null;
        }

        return Calculator.calculateDelta(now.close, past.close);
    }

}