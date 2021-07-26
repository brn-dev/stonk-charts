import { Injectable } from '@angular/core';
import { Indicator } from '../../models/indicators/indicator';
import { HighIndicator } from '../../models/indicators/high-indicator';
import { LowIndicator } from '../../models/indicators/low-indicator';
import { Timespan, TimespanUnit } from '../../models/timespan';
import { ToggleActiveSet } from '../../models/toggle-active-set';
import { RsiIndicator } from '../../models/indicators/rsi-indicator';
import { TimespanIndicator } from '../../models/indicators/timespan-indicator';
import { AllocationPercentIndicator } from '../../models/indicators/portfolio/allocation-percent-indicator';
import { AllocationAmountIndicator } from '../../models/indicators/portfolio/allocation-amount-indicator';
import { ProfitLossPercentIndicator } from '../../models/indicators/portfolio/profit-loss-percent-indicator';
import { AverageLeverageIndicator } from '../../models/indicators/portfolio/average-leverage-indicator';
import { OneYearTargetEstimationIndicator } from '../../models/indicators/estimation/one-year-target-estimation-indicator';
import { ExposureAmountIndicator } from '../../models/indicators/portfolio/exposure-amount-indicator';
import { ExposurePercentIndicator } from '../../models/indicators/portfolio/exposure-percent-indicator';
import { StatisticsIndicator } from '../../models/indicators/statistics/statistics-indicator';
import { TrailingForwardPeRatioIndicator } from '../../models/indicators/statistics/trailing-forward-pe-ratio-indicator';
import { AverageFinancialGrowthIndicator } from '../../models/indicators/financials/average-financial-growth-indicator';
import { OneYearEstimationAverageDeviationIndicator } from '../../models/indicators/estimation/one-year-estimation-average-deviation-indicator';
import { OneYearLowEstimationIndicator } from '../../models/indicators/estimation/one-year-low-estimation-indicator';
import { OneYearHighEstimationIndicator } from '../../models/indicators/estimation/one-year-high-estimation-indicator';
import { OneYearEstimationsCount } from '../../models/indicators/estimation/one-year-estimations-count';
import { FileService } from '../file.service';

export interface IndicatorGroup {
    title?: string;
    indicators: Indicator<any>[];
}

@Injectable({
    providedIn: 'root'
})
export class IndicatorService {

    public readonly ACTIVE_INDICATORS_FILE_NAME = 'active-indicators.json';

    public availableIndicators: IndicatorGroup[] = [
        {
            title: 'Estimations',
            indicators: [
                OneYearTargetEstimationIndicator.singleton,
                OneYearEstimationAverageDeviationIndicator.singleton,
                OneYearLowEstimationIndicator.singleton,
                OneYearHighEstimationIndicator.singleton,
                OneYearEstimationsCount.singleton
            ]
        },
        {
            title: 'Portfolio',
            indicators: [
                AllocationAmountIndicator.singleton,
                AllocationPercentIndicator.singleton,
                ExposureAmountIndicator.singleton,
                ExposurePercentIndicator.singleton,
                AverageLeverageIndicator.singleton,
                ProfitLossPercentIndicator.singleton,
            ]
        },
        {
            title: 'Timespan Delta',
            indicators: [
                // day
                TimespanIndicator.get(Timespan.get(TimespanUnit.DAY, 1)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.DAY, 3)),
                // week
                TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 1)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 2)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 3)),
                //month
                TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 1)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 3)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 6)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 9)),
                // year
                TimespanIndicator.get(Timespan.get(TimespanUnit.Year, 1)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Year, 2)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Year, 3)),
                TimespanIndicator.get(Timespan.get(TimespanUnit.Year, 5)),
                // max
                TimespanIndicator.get(Timespan.get(TimespanUnit.Max)),
            ]
        },
        {
            title: 'Low',
            indicators: [
                LowIndicator.get(Timespan.get(TimespanUnit.Week, 1)),
                LowIndicator.get(Timespan.get(TimespanUnit.Month, 1)),
                LowIndicator.get(Timespan.get(TimespanUnit.Month, 3)),
                LowIndicator.get(Timespan.get(TimespanUnit.Month, 6)),
                LowIndicator.get(Timespan.get(TimespanUnit.Year, 1)),
            ]
        },
        {
            title: 'High',
            indicators: [
                HighIndicator.get(Timespan.get(TimespanUnit.Week, 1)),
                HighIndicator.get(Timespan.get(TimespanUnit.Month, 1)),
                HighIndicator.get(Timespan.get(TimespanUnit.Month, 3)),
                HighIndicator.get(Timespan.get(TimespanUnit.Month, 6)),
                HighIndicator.get(Timespan.get(TimespanUnit.Year, 1)),
            ]
        },
        {
            title: 'RSI',
            indicators: [
                RsiIndicator.get(Timespan.get(TimespanUnit.DAY, 14)),
            ]
        },
        {
            title: 'Statistics',
            indicators: [
                StatisticsIndicator.marketCapIndicator,
                StatisticsIndicator.enterpriseValueIndicator,
                StatisticsIndicator.trailingPEIndicator,
                StatisticsIndicator.forwardPEIndicator,
                TrailingForwardPeRatioIndicator.singleton,
                StatisticsIndicator.pegRatioIndicator,
                StatisticsIndicator.priceToSalesIndicator,
                StatisticsIndicator.priceToBookIndicator,
                StatisticsIndicator.evToRevenueIndicator,
                StatisticsIndicator.evToEbitdaIndicator,
                StatisticsIndicator.profitMarginIndicator,
                StatisticsIndicator.operatingMarginIndicator,
                StatisticsIndicator.returnOnAssetsIndicator,
                StatisticsIndicator.returnOnEquityIndicator,
                StatisticsIndicator.revenueGrowthIndicator,
                StatisticsIndicator.earningsGrowthIndicator,
                StatisticsIndicator.shortPercentIndicator,
                StatisticsIndicator.trailingDividendYieldIndicator,
                StatisticsIndicator.forwardDividendYieldIndicator,
                StatisticsIndicator.dividendPayoutRatioIndicator,
            ]
        },
        {
            title: 'Financials',
            indicators: [
                AverageFinancialGrowthIndicator.averageRevenueGrowthIndicator,
                AverageFinancialGrowthIndicator.averageAssetsGrowthIndicator,
            ]
        },
    ];

    private _activeIndicators: Indicator<any>[] = [];

    constructor(private fileService: FileService) {
        const loadSuccessful = this.loadActiveIndicators();

        if (!loadSuccessful) {
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.DAY, 1)));
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 1)));
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 2)));
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 1)));
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 3)));
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 6)));
            this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Year, 1)));
        }
    }

    get activeIndicators(): Indicator<any>[] {
        return this._activeIndicators;
    }

    public toggleActive(indicator: Indicator<any>): void {
        if (this._activeIndicators.includes(indicator)) {
            this._activeIndicators.splice(this._activeIndicators.indexOf(indicator), 1);
        } else {
            this._activeIndicators.push(indicator);
        }
        this.saveActiveIndicators();
    }

    public isActive(indicator: Indicator<any>): boolean {
        return this._activeIndicators.includes(indicator);
    }

    public clearActiveIndicators(): void {
        this._clearActiveIndicators();
        this.saveActiveIndicators();
    }

    public clearGroup(group: IndicatorGroup): void {
        for (const indicator of group.indicators) {
            const idx = this._activeIndicators.indexOf(indicator);
            if (idx >= 0) {
                this._activeIndicators.splice(idx, 1);
            }
        }
        this.saveActiveIndicators();
    }

    private _clearActiveIndicators(): void {
        this._activeIndicators = [];
    }

    private saveActiveIndicators(): void {
        const activeIndicatorDescriptions = this._activeIndicators.map(i => i.shortDescription);
        this.fileService.writeJsonToFile(this.ACTIVE_INDICATORS_FILE_NAME, activeIndicatorDescriptions);
    }

    private loadActiveIndicators(): boolean {
        const activeIndicatorDescriptions = this.fileService.readJsonFromFile<string[]>(this.ACTIVE_INDICATORS_FILE_NAME);

        if (!activeIndicatorDescriptions) {
            return false;
        }

        this._clearActiveIndicators();
        for (const indicatorDescription of activeIndicatorDescriptions) {
            let found = false;
            for (const indicatorGroup of this.availableIndicators) {
                for (const indicator of indicatorGroup.indicators) {
                    if (indicator.shortDescription === indicatorDescription) {
                        this.toggleActive(indicator);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        console.log('Successfully activated the following indicators: ' + activeIndicatorDescriptions.join(', '));
        return true;
    }

}
