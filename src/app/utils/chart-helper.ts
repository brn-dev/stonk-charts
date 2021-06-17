import { Chart } from '../models/chart';
import { ChartEntry } from '../models/chart-entry';
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

    public static calculateDelta(now: number, past: number): number | null {
        return now / past - 1;
    }
}
