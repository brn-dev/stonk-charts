import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/asset-data/chart';
import { Timespan } from '../../models/timespan';
import { BasicAssetDataCacheService } from '../../services/asset-data/basic-asset-data-cache.service';
import { DateUtils } from '../../utils/date-utils';
import * as Highcharts from 'highcharts';
import { SettingsService } from '../../services/settings.service';
import { ChartHelper } from '../../utils/chart-helper';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset/asset.service';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Indicator, NumberIndicator } from '../../models/indicators/indicator';
import { IndicatorResultCacheService } from '../../services/indicator/indicator-result-cache.service';
import { IndicatorMinMaxService } from '../../services/indicator/indicator-min-max.service';
import { TimespanIndicator } from '../../models/indicators/timespan-indicator';
import { AssetFinancialsCacheService } from '../../services/asset-data/asset-financials-cache.service';
import { FilterStateService } from '../../services/asset/filter-state.service';

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

    constructor(
        public settingsService: SettingsService,
        private basicAssetDataCacheService: BasicAssetDataCacheService,
        private assetFinancialsCacheService: AssetFinancialsCacheService,
        private assetService: AssetService,
        private indicatorService: IndicatorService,
        private filterStateService: FilterStateService,
    ) {
    }

    get chart(): Chart {
        return this.basicAssetDataCacheService.getForAsset(this.asset)?.chart ?? null;
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
        this.basicAssetDataCacheService.$assetUpdated.subscribe(asset => {
            if (this.asset === asset) {
                this.updateChartOptions();
            }
        });
    }

    public fetchBasicAssetData(): void {
        this.basicAssetDataCacheService.fetchAsset(this.asset);
    }

    public fetchFinancials(): void {
        this.assetFinancialsCacheService.fetchAsset(this.asset);
    }

    public hideAsset(): void {
        this.filterStateService.hideAsset(this.asset);
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
