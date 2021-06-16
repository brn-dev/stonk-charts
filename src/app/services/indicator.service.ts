import { Injectable } from '@angular/core';
import { Indicator } from '../models/indicators/indicator';
import { HighIndicator } from '../models/indicators/high-indicator';
import { LowIndicator } from '../models/indicators/low-indicator';
import { Timespan, TimespanUnit } from '../models/timespan';
import { ToggleActiveSet } from '../models/toggle-active-set';
import { RsiIndicator } from '../models/indicators/rsi-indicator';

@Injectable({
    providedIn: 'root'
})
export class IndicatorService {

    public availableIndicators: Indicator<any>[][] = [
        [
            LowIndicator.get(Timespan.get(TimespanUnit.Week, 1)),
            LowIndicator.get(Timespan.get(TimespanUnit.Month, 1)),
            LowIndicator.get(Timespan.get(TimespanUnit.Month, 3)),
            LowIndicator.get(Timespan.get(TimespanUnit.Month, 6)),
            LowIndicator.get(Timespan.get(TimespanUnit.Year, 1)),
        ],
        [
            HighIndicator.get(Timespan.get(TimespanUnit.Week, 1)),
            HighIndicator.get(Timespan.get(TimespanUnit.Month, 1)),
            HighIndicator.get(Timespan.get(TimespanUnit.Month, 3)),
            HighIndicator.get(Timespan.get(TimespanUnit.Month, 6)),
            HighIndicator.get(Timespan.get(TimespanUnit.Year, 1)),
        ],
        [
            RsiIndicator.get(Timespan.get(TimespanUnit.DAY, 14)),
        ]
    ];

    private readonly _activeIndicatorsSet = new ToggleActiveSet<Indicator<any>>();

    constructor() { }

    get activeIndicators(): Indicator<any>[] {
        const indicators: Indicator<any>[] = [];

        for (const indicatorSection of this.availableIndicators) {
            for (const indicator of indicatorSection) {
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
