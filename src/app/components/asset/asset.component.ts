import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { Timespan } from '../../models/timespan';
import { ChartCacheService } from '../../services/chart-cache.service';
import { DateUtils } from '../../utils/date-utils';
import * as Highcharts from 'highcharts';
import { SettingsService } from '../../services/settings.service';
import { ChartHelper } from '../../utils/chart-helper';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { IndicatorService } from '../../services/indicator.service';
import { Indicator, NumberIndicator } from '../../models/indicators/indicator';
import { IndicatorResultCacheService } from '../../services/indicator-result-cache.service';
import { IndicatorMinMaxService } from '../../services/indicator-min-max.service';
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
        public settingsService: SettingsService,
        private chartCacheService: ChartCacheService,
        private assetService: AssetService,
        private indicatorService: IndicatorService,
        private indicatorResultCacheService: IndicatorResultCacheService,
        private indicatorMinMaxService: IndicatorMinMaxService,
    ) {
    }

    get chart(): Chart {
        return this.chartCacheService.getForAsset(this.asset);
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

    ngOnInit(): void {
        this.updateChartOptions();
        this.settingsService.$chartDaysUpdated.subscribe(() => this.updateChartOptions());
        this.chartCacheService.$assetUpdated.subscribe(asset => {
            if (this.asset === asset) {
                this.updateChartOptions();
            }
        });
    }

    public getIndicatorValue<T>(indicator: Indicator<T>): T {
        if (!this.chart) {
            return null;
        }

        return this.indicatorResultCacheService.calculateResult(this.asset, indicator);
    }

    public getIndicatorDisplayValue(indicator: Indicator<any>): any {
        const value = indicator.toDisplayFormat(this.getIndicatorValue(indicator));
        return value ? value.toString() : 'n/a';
    }

    public getMinForIndicator(indicator: NumberIndicator): number {
        return this.indicatorMinMaxService.getMinForVisibleCharts(indicator);
    }

    public getMaxForIndicator(indicator: NumberIndicator): number {
        return this.indicatorMinMaxService.getMaxForVisibleCharts(indicator);
    }

    public getTimespan(indicator: Indicator<any>): Timespan {
        if (!(indicator instanceof TimespanIndicator)) {
            return null;
        }

        return indicator.timespan;
    }

    public getTimestamp(indicator: Indicator<any>): number {
        if (!this.chart || !(indicator instanceof TimespanIndicator)) {
            return null;
        }

        const entry = ChartHelper.getDayInPastFromTimespan(this.chart, indicator.timespan);

        if (entry === null) {
            return null;
        }

        return entry.timestamp;
    }

    public fetch(): void {
        this.chartCacheService.fetchAsset(this.asset);
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
                entry.timestamp,
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
                min: this.chart.entries[this.chart.entries.length - start].timestamp,
                max: this.chart.entries[this.chart.entries.length - 1].timestamp
            },
            series: [{
                name: this.asset.symbol,
                data,
                type: 'line'
            }]
        };
    }
}
