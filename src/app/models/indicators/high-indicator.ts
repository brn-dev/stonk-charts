import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { DeltaIndicator, Indicator } from "./indicator";

export class HighIndicator extends DeltaIndicator {

    public isDelta = true;

    constructor(private timespan: Timespan) {
        super(timespan.displayText + ' High');
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
            if (h > high) {
                high = h;
            }
        }

        const diff = high - chart.entries[entriesLength - 1].close;

        return -(diff / high) ;
    }

}