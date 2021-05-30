import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { Indicator } from "./indicator";

export class LowIndicator implements Indicator {

    public isDelta = true;

    constructor(private timespan: Timespan) {
    }

    get displayText(): string {
        return this.timespan.displayText + ' Low';
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