import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { ChartEntry } from '../models/chart-entry';
import { Timespan, TimespanUnit } from '../models/timespan';
import { SettingsService } from './settings.service';
import { AssetSymbol } from '../models/asset-symbol';

@Injectable({
  providedIn: 'root'
})
export class ChartHelperService {

  constructor(private settingsService: SettingsService) { }

  public getDayInPast(chart: Chart, timespan: Timespan): ChartEntry | null {
    if (timespan.unit === TimespanUnit.Max) {
      return chart.entries[0];
    }

    if (timespan.unit === TimespanUnit.Graph) {
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

  
  public getEstimation1Year(symbol: AssetSymbol, chart: Chart): number {
    if (!symbol.estimation1Year) {
      return null;
    }
    return symbol.estimation1Year / this.latestChartEntry(chart).close - 1;
  }
}
