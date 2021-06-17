import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { DeltaIndicator, Indicator } from "./indicator";

export class HighIndicator extends DeltaIndicator {

    private static _timespanHighIndicatorMap = new Map<Timespan, HighIndicator>();

    public static get(timespan: Timespan): HighIndicator {
        if (this._timespanHighIndicatorMap.has(timespan)) {
            return this._timespanHighIndicatorMap.get(timespan);
        }

        const indicator = new HighIndicator(timespan);
        this._timespanHighIndicatorMap.set(timespan, indicator);
        return indicator;
    }

    public isDelta = true;

    private constructor(private timespan: Timespan) {
        super(timespan.displayText + ' High', timespan.displayText + ' High');
    }

    public compute(chart: Chart): number {       
        const days = this.timespan.toDays().amount;
        const entriesLength = chart?.entries.length ?? 0;

        if (entriesLength === 0) {
            return null;
        }

        let high = chart.entries[entriesLength - 1].high;

        for (let i = 2; i < days + 1 && entriesLength - i >= 0; i++) {
            const h = chart.entries[entriesLength - i].high;
            if (!h) {
                continue;
            }
            if (!high || h > high) {
                high = h;
            }
        }

        const diff = high - chart.entries[entriesLength - 1].close;

        if (!this.isValidNumber(diff) || !this.isValidNumber(high)) {
            return null;
        }

        return -(diff / high) ;
    }

}