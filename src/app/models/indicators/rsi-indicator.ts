import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { Indicator } from "./indicator";

export class RsiIndicator implements Indicator {
    public isDelta = false;

    constructor(private timespan: Timespan) {
    }

    get displayText(): string {
        return 'RSI ' + this.timespan.displayText;
    }

    public compute(chart: Chart): number {
        const entries = chart.entries;
        const entriesLength = entries.length;
        const rsiPeriod = this.timespan.toDays().amount;
        const days = rsiPeriod + 1;

        if (entriesLength < days) {
            return null;
        }

        const ups: number[] = [];
        const downs: number[] = [];

        for (let i = entriesLength - (days + 1); i < entriesLength - 1; i++) {
            const change = entries[i + 1].close - entries[i].close;
            ups.push(change > 0 ? change : 0);
            downs.push(change < 0 ? -change : 0);
        }

        const avgU = this.avg(ups);
        const avgD = this.avg(downs);

        const rs = avgU / avgD;

        const rsi = 100 - 100 / (1 + rs);

        return Math.round(rsi * 100) / 100;
    }

    private avg(numbers: number[]) {
        return this.sum(numbers) / numbers.length;
    }

    private sum(numbers: number[]) {
        let sum = 0;
        for (const num of numbers) {
            sum += num;
        }
        return sum;
    }

}