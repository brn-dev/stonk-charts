import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { Indicator } from "./indicator";

export class HighIndicator implements Indicator {

    public isDelta = true;

    constructor(private timespan: Timespan) {
    }

    get displayText(): string {
        return this.timespan.displayText + ' High';
    }

    public compute(chart: Chart): number {       
        const days = this.timespan.toDays().amount;
        const entriesLength = chart.entries.length;

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
        return 1 - (high / chart.entries[entriesLength - 1].close) ;
    }

}