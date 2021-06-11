import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { Timespan, TimespanUnit } from '../../models/timespan';
import { CacheService } from '../../services/cache.service';
import { TimespanService } from '../../services/timespan.service';
import { DateUtils } from '../../utils/date-utils';
import * as Highcharts from 'highcharts'
import { SettingsService } from '../../services/settings.service';
import { ChartHelper } from '../../utils/chart-helper';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { IndicatorService } from '../../services/indicator.service';
import { Indicator } from '../../models/indicators/indicator';
import { IndicatorResultCacheService } from '../../services/indicator-result-cache.service';
import { TimespanIndicator } from '../../models/indicators/timespan-indicator';

@Component({
    selector: 'app-asset',
    templateUrl: './asset.component.html',
    styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

    @Input()
    public asset: Asset;

    public highcharts: typeof Highcharts = Highcharts;

    public chartOptions: Highcharts.Options;

    private _positionIndex: number = null;

    constructor(
        private cacheService: CacheService,
        private timespanService: TimespanService,
        private assetService: AssetService,
        private settingsService: SettingsService,
        private indicatorService: IndicatorService,
        private indicatorResultCacheService: IndicatorResultCacheService,
    ) {
    }

    get chart(): Chart {
        return this.cacheService.getForAsset(this.asset);
    }

    get timespanIndicators(): TimespanIndicator[] {
        return this.timespanService.activeTimespanIndicators;
    }

    get indicators(): Indicator<any>[] {
        return this.indicatorService.activeIndicators;
    }

    get dataDate(): string {
        if (!this.chart) {
            return '';
        }
        const timestamp = ChartHelper.lastDay(this.chart).timestamp;
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
        return this.assetService.getPositionIndex(this.asset);
    }

    get oneYearEstimationDelta(): number {
        return ChartHelper.getOneYearEstimation(this.asset, this.chart);
    }

    set positionIndex(index: number) {
        this._positionIndex = index;
    }

    ngOnInit(): void {
        this.updateChartOptions();
        this.settingsService.$chartDaysUpdated.subscribe(() => this.updateChartOptions());
        this.cacheService.$assetUpdated.subscribe(asset => {
            if (this.asset === asset) {
                this.updateChartOptions();
            }
        });
    }

    public getTimestamp(timespan: Timespan): number {
        if (!this.chart) {
            return null;
        }

        const entry = ChartHelper.getDayInPastFromTimespan(this.chart, timespan, this.settingsService);

        if (entry === null) {
            return null;
        }

        return entry.timestamp;
    }

    public getIndicatorValue(indicator: Indicator<any>): any {
        if (!this.chart) {
            return null;
        }

        return this.indicatorResultCacheService.calculateDelta(this.chart, indicator);
    }

    public getIndicatorValueOrNA(indicator: Indicator<any>): any {
        const value = this.getIndicatorValue(indicator);
        return value ? value.toString() : 'n/a';
    }

    public async fetch() {
        this.cacheService.fetchAsset(this.asset);
    }

    public remove() {
        this.assetService.removeAsset(this.asset);
    }

    public changePosition() {
        if (this._positionIndex === null) {
            return;
        }
        this.assetService.changePosition(this.asset, this._positionIndex);
        this._positionIndex = null;
    }

    public updateChartOptions(): void {
        if (!this.chart || !this.settingsService.chartDays) {
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
                text: this.asset.symbol
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
                name: this.asset.symbol,
                data,
                type: 'line'
            }]
        };
    }
}
