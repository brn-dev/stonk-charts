import { Injectable } from '@angular/core';
import { Indicator } from '../models/indicators/indicator';
import { HighIndicator } from '../models/indicators/high-indicator';
import { LowIndicator } from '../models/indicators/low-indicator';
import { Timespan, TimespanUnit } from '../models/timespan';
import { ToggleActiveSet } from '../models/toggle-active-set';
import { RsiIndicator } from '../models/indicators/rsi-indicator';
import { TimespanIndicator } from '../models/indicators/timespan-indicator';
import { AllocationPercentIndicator } from '../models/indicators/portfolio/allocation-percent-indicator';
import { AllocationAmountIndicator } from '../models/indicators/portfolio/allocation-amount-indicator';
import { ProfitLossPercentIndicator } from '../models/indicators/portfolio/profit-loss-percent-indicator';
import { AverageLeverageIndicator } from '../models/indicators/portfolio/average-leverage-indicator';
import { OneYearEstimationIndicator } from '../models/indicators/one-year-estimation-indicator';
import { ExposureAmountIndicator } from '../models/indicators/portfolio/exposure-amount-indicator';
import { ExposurePercentIndicator } from '../models/indicators/portfolio/exposure-percent-indicator';
import { StatisticsIndicator } from '../models/indicators/statistics-indicator';

export interface IndicatorGroup {
    title?: string;
    indicators: Indicator<any>[];
}

@Injectable({
    providedIn: 'root'
})
export class IndicatorService {

    public availableIndicators: IndicatorGroup[] = [
        {
            title: 'Misc',
            indicators: [
                OneYearEstimationIndicator.singleton
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
    ];

    private readonly _activeIndicatorsSet = new ToggleActiveSet<Indicator<any>>();

    constructor() {
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.DAY, 1)));
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 1)));
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Week, 2)));
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 1)));
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 3)));
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Month, 6)));
        this.toggleActive(TimespanIndicator.get(Timespan.get(TimespanUnit.Year, 1)));
    }

    get activeIndicators(): Indicator<any>[] {
        const indicators: Indicator<any>[] = [];

        for (const indicatorGroup of this.availableIndicators) {
            for (const indicator of indicatorGroup.indicators) {
                if (this._activeIndicatorsSet.isActive(indicator)) {
                    indicators.push(indicator);
                }
            }
        }

        return indicators;
    }

    public toggleActive(indicator: Indicator<any>): void {
        this._activeIndicatorsSet.toggleActive(indicator);
    }

    public isActive(indicator: Indicator<any>): boolean {
        return this._activeIndicatorsSet.isActive(indicator);
    }

    public clearActiveIndicators(): void {
        this._activeIndicatorsSet.clear();
    }

}
