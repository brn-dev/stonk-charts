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
import { ProfitLossIndicator } from '../models/indicators/portfolio/profit-loss-indicator';
import { AverageLeverageIndicator } from '../models/indicators/portfolio/average-leverage-indicator';

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
            title: 'Portfolio',
            indicators: [
                AllocationAmountIndicator.singleton,
                AllocationPercentIndicator.singleton,
                // ProfitLossIndicator.singleton,
                AverageLeverageIndicator.singleton,
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
