import { Component, Input, OnInit } from '@angular/core';
import { Chart } from '../../models/chart';
import { Timespan } from '../../models/timespan';
import { CacheService } from '../../services/cache.service';
import { DateUtils } from '../../utils/date-utils';
import * as Highcharts from 'highcharts';
import { SettingsService } from '../../services/settings.service';
import { ChartHelper } from '../../utils/chart-helper';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { IndicatorService } from '../../services/indicator.service';
import { Indicator, NumberIndicator } from '../../models/indicators/indicator';
import { IndicatorResultCacheService } from '../../services/indicator-result-cache.service';
import { TimespanIndicator } from '../../models/indicators/timespan-indicator';
import { IndicatorMinMaxService } from '../../services/indicator-min-max.service';
import { OneYearEstimationIndicator } from '../../models/indicators/one-year-estimation-indicator';
import { PortfolioService } from '../../services/portfolio.service';
import { ProfitLossIndicator } from '../../models/indicators/profit-loss-indicator';
import { AllocationPercentIndicator } from '../../models/indicators/allocation-percent-indicator';
import { PortfolioAssetInvestmentInfo } from '../../models/portfolio-asset-investment-info';

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
        private assetService: AssetService,
        private settingsService: SettingsService,
        private indicatorService: IndicatorService,
        private indicatorResultCacheService: IndicatorResultCacheService,
        private indicatorMinMaxService: IndicatorMinMaxService,
        private portfolioService: PortfolioService,
    ) {
    }

    get chart(): Chart {
        return this.cacheService.getForAsset(this.asset);
    }

    get investmentInfo(): PortfolioAssetInvestmentInfo {
        return this.portfolioService.getInvestmentInfoForAsset(this.asset);
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

    get oneYearEstimationIndicator(): OneYearEstimationIndicator {
        return OneYearEstimationIndicator.singleton;
    }

    get profitLossIndicator(): ProfitLossIndicator {
        return ProfitLossIndicator.singleton;
    }

    get allocationPercentIndicator(): AllocationPercentIndicator {
        return AllocationPercentIndicator.singleton;
    }

    get positionIndex(): number {
        if (this._positionIndex) {
            return this._positionIndex;
        }
        return this.assetService.getPositionIndex(this.asset);
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

        const entry = ChartHelper.getDayInPastFromTimespan(this.chart, timespan);

        if (entry === null) {
            return null;
        }

        return entry.timestamp;
    }

    public getIndicatorValue<T>(indicator: Indicator<T>): T {
        if (!this.chart) {
            return null;
        }

        return this.indicatorResultCacheService.calculateResult(this.chart, this.asset, this.investmentInfo, indicator);
    }

    public getIndicatorValueOrNA(indicator: Indicator<any>): any {
        const value = this.getIndicatorValue(indicator);
        return value ? value.toString() : 'n/a';
    }

    public getMinForIndicator(indicator: NumberIndicator): number {
        return this.indicatorMinMaxService.getMinForVisibleCharts(indicator);
    }

    public getMaxForIndicator(indicator: NumberIndicator): number {
        return this.indicatorMinMaxService.getMaxForVisibleCharts(indicator);
    }

    public fetch(): void {
        this.cacheService.fetchAsset(this.asset);
    }

    public changePosition(): void {
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
