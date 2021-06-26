import { Chart } from '../models/asset-data/chart';
import { ChartEntry } from '../models/asset-data/chart-entry';
import { Timespan, TimespanUnit } from '../models/timespan';

export class ChartHelper {

    public static getDayInPastFromTimespan(chart: Chart, timespan: Timespan): ChartEntry | null {
        if (chart === null || timespan == null) {
            return null;
        }

        if (timespan.unit === TimespanUnit.Max) {
            return this.firstDay(chart);
        }

        return this.getDayInPast(chart, timespan.toDays().amount);
    }


    public static getDayInPast(chart: Chart, days: number): ChartEntry | null {
        if (!chart?.entries) {
            return null;
        }
        const idx = chart.entries.length - 1 - days;
        if (idx < 0) {
            return null;
        }
        return chart.entries[idx];
    }

    public static lastDay(chart: Chart): ChartEntry {
        return this.getDayInPast(chart, 0);
    }

    public static firstDay(chart: Chart): ChartEntry {
        return chart.entries[0];
    }
}
