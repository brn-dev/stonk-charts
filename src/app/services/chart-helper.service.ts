import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { Chart } from '../models/chart';
import { ChartEntry } from '../models/chart-entry';
import { Timespan, TimespanUnit } from '../models/timespan';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ChartHelperService {

    constructor(private settingsService: SettingsService) { }

    public getDayInPast(chart: Chart, timespan: Timespan): ChartEntry | null {
        if (timespan.unit === TimespanUnit.Max) {
            return chart.entries[0];
        }

        if (timespan.unit === TimespanUnit.Chart) {
            let idx = chart.entries.length - 1 - this.settingsService.chartDays;

            if (idx < 0) {
                return chart.entries[0];
            }

            return chart.entries[idx];
        }

        let idx = chart.entries.length - 1 - timespan.toDays().amount;
        if (idx < 0) {
            return null;
        }
        return chart.entries[idx];
    }

    public getDelta(chart: Chart, timespan: Timespan): number | null {
        const now = this.latestChartEntry(chart);
        const past = this.getDayInPast(chart, timespan);

        if (past === null) {
            return null;
        }

        return now.close / past.close - 1;
    }

    public latestChartEntry(chart: Chart) {
        return chart.entries[chart.entries.length - 1];
    }


    public getOneYearEstimation(asset: Asset, chart: Chart): number {
        if (!asset.oneYearEstimation || !chart?.entries) {
            return null;
        }
        return asset.oneYearEstimation / this.latestChartEntry(chart).close - 1;
    }
}
