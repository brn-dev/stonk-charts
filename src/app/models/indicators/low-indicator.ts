import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { DeltaIndicator, Indicator } from "./indicator";

export class LowIndicator extends DeltaIndicator {

    public isDelta = true;

    constructor(private timespan: Timespan) {
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
            if (l < low) {
                low = l;
            }
        }

        const diff = chart.entries[entriesLength - 1].close - low;

        return diff / low;
    }

}