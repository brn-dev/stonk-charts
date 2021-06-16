import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { DeltaIndicator, Indicator } from "./indicator";

export class LowIndicator extends DeltaIndicator {

    private static _timespanLowIndicatorMap = new Map<Timespan, LowIndicator>();

    public static get(timespan: Timespan): LowIndicator {
        if (this._timespanLowIndicatorMap.has(timespan)) {
            return this._timespanLowIndicatorMap.get(timespan);
        }

        const indicator = new LowIndicator(timespan);
        this._timespanLowIndicatorMap.set(timespan, indicator);
        return indicator;
    }

    public isDelta = true;

    private constructor(private timespan: Timespan) {
        super(timespan.displayText + ' Low');
    }

    public compute(chart: Chart): number {       
        const days = this.timespan.toDays().amount;
        const entriesLength = chart?.entries.length ?? 0;

        if (entriesLength === 0) {
            return null;
        }

        let low = chart.entries[entriesLength - 1].low;

        for (let i = 2; i < days + 1 && entriesLength - i >= 0; i++) {
            const l = chart.entries[entriesLength - i].low;
            if (!l) {
                continue;
            }
            if (!low || l < low) {
                low = l;
            }
        }

        const diff = chart.entries[entriesLength - 1].close - low;

        if (!this.isValidNumber(diff) || !this.isValidNumber(low)) {
            return null;
        }

        return diff / low;
    }

}