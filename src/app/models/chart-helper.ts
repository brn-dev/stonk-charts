import { Chart } from "./chart";
import { ChartEntry } from "./chart-entry";
import { Timespan } from "./timespan";

export class ChartHelper {

    public static getDayInPast(chart: Chart, timespan: Timespan): ChartEntry | null {
        let idx = chart.entries.length - 1 - timespan.toDays().amount;
        if (idx < 0) {
            return null;
        }
        return chart.entries[idx];
    }

    public static getDelta(chart: Chart, timespan: Timespan): number | null {
        const now = ChartHelper.latestChartEntry(chart);
        const past = this.getDayInPast(chart, timespan);

        if (past === null) {
            return null;
        }

        return now.close / past.close - 1;
    }

    public static latestChartEntry(chart: Chart) {
        return chart.entries[chart.entries.length - 1];
    }

}