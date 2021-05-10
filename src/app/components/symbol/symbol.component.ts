import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { Timespan, TimespanUnit } from '../../models/timespan';
import { CacheService } from '../../services/cache.service';
import { SymbolService } from '../../services/symbol.service';
import { TimespanService } from '../../services/timespan.service';
import { DateUtils } from '../../utils/date-utils';
import * as Highcharts from 'highcharts'
import { SettingsService } from '../../services/settings.service';
import { ChartHelperService } from '../../services/chart-helper.service';
import { AssetSymbol } from '../../models/asset-symbol';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss']
})
export class SymbolComponent implements OnInit {

  @Input()
  public symbol: AssetSymbol;

  public highcharts: typeof Highcharts = Highcharts;

  public chartOptions: Highcharts.Options;

  private _positionIndex: number = null;

  constructor(
    private cacheService: CacheService,
    private timespanService: TimespanService,
    private symbolService: SymbolService,
    private settingsService: SettingsService,
    private chartHelperService: ChartHelperService
  ) {
  }

  get chart(): Chart {
    return this.cacheService.getForSymbol(this.symbol);
  }

  get deltaTimespans(): Timespan[] {
    return this.timespanService.activeTimespans;
  }

  get dataDate(): string {
    if (!this.chart) {
      return '';
    }
    const timestamp = this.chartHelperService.latestChartEntry(this.chart).timestamp;
    return DateUtils.toIsoString(timestamp);
  }

  get dataDays(): number {
    if (!this.chart) {
      return -1;
    }
    return this.chart.entries.length;
  }

  get positionIndex(): number {
    if (this._positionIndex) {
      return this._positionIndex;
    }
    return this.symbolService.getPositionIndex(this.symbol);
  }

  set positionIndex(index: number) {
    this._positionIndex = index;
  }

  ngOnInit(): void {
    this.updateChartOptions();
    this.settingsService.$chartDaysUpdated.subscribe(() => this.updateChartOptions());
    this.cacheService.$symbolUpdated.subscribe(symbol => {
      if (this.symbol === symbol) {
        this.updateChartOptions();
      }
    });
  }

  public getDelta(timespan: Timespan): number {
    if (!this.chart) {
      return 0;
    }
    return this.chartHelperService.getDelta(this.chart, timespan);
  }

  public getTimestamp(timespan: Timespan): number {
    if (!this.chart) {
      return null;
    }
    
    const entry = this.chartHelperService.getDayInPast(this.chart, timespan);

    if (entry === null) {
      return null;
    }

    return entry.timestamp;
  }

  public async fetch() {
    this.cacheService.fetchSymbol(this.symbol);
  }

  public remove() {
    this.symbolService.removeSymbol(this.symbol);
  }

  public changePosition() {
    if (this._positionIndex === null) {
      return;
    }
    this.symbolService.changePosition(this.symbol, this._positionIndex);
    this._positionIndex = null;
  }

  public updateChartOptions(): void {
    if (!this.chart) {
      return null;
    }

    const data: [number, number][] = [];

    let start = this.settingsService.chartDays;
    if (start >= this.chart.entries.length) {
      start = this.chart.entries.length - 1;
    }

    for (let i = start; i > 0; i--) {
      const entry = this.chart.entries[this.chart.entries.length - i];
      data.push([
        entry.timestamp * 1000,
        entry?.close ? +entry.close.toFixed(2) : null
      ]);
    }

    this.chartOptions = {
      title: {
        text: this.symbol.symbol
      },
      yAxis: {
        title: {
          text: 'USD'
        }
      },
      xAxis: {
        type: 'datetime',
        min: this.chart.entries[this.chart.entries.length - start].timestamp * 1000,
        max: this.chart.entries[this.chart.entries.length - 1].timestamp * 1000
      },
      series: [{
        name: this.symbol.symbol,
        data,
        type: 'line'
      }]
    };
  }
}
