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

    public availableIndicators: Indicator[][] = [
        [
            new LowIndicator(new Timespan(1, TimespanUnit.Week)),
            new LowIndicator(new Timespan(1, TimespanUnit.Month)),
            new LowIndicator(new Timespan(3, TimespanUnit.Month)),
            new LowIndicator(new Timespan(6, TimespanUnit.Month)),
            new LowIndicator(new Timespan(1, TimespanUnit.Year)),
        ],
        [
            new HighIndicator(new Timespan(1, TimespanUnit.Week)),
            new HighIndicator(new Timespan(1, TimespanUnit.Month)),
            new HighIndicator(new Timespan(3, TimespanUnit.Month)),
            new HighIndicator(new Timespan(6, TimespanUnit.Month)),
            new HighIndicator(new Timespan(1, TimespanUnit.Year)),
        ],
        [
            new RsiIndicator(new Timespan(14, TimespanUnit.DAY)),
        ]
    ];

    private readonly _activeIndicatorsSet = new ToggleActiveSet<Indicator>();

    constructor() { }

    get activeIndicators(): Indicator[] {
        const indicators: Indicator[] = [];

        for (const indicatorSection of this.availableIndicators) {
            for (const indicator of indicatorSection) {
                if (this._activeIndicatorsSet.isActive(indicator)) {
                    indicators.push(indicator);
                }
            }
        }

        return indicators;
    }

    public toggleActive(indicator: Indicator): void {
        this._activeIndicatorsSet.toggleActive(indicator);
    }

    public isActive(indicator: Indicator): boolean {
        return this._activeIndicatorsSet.isActive(indicator);
    }

    public clearActiveIndicators(): void {
        this._activeIndicatorsSet.clear();
    }

}
