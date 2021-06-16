import { Injectable } from '@angular/core';
import { TimespanIndicator } from '../models/indicators/timespan-indicator';
import { Timespan, TimespanUnit } from '../models/timespan';
import { ToggleActiveSet } from '../models/toggle-active-set';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class TimespanService {

    public readonly availableTimespans: Timespan[] = [
        // graph
        Timespan.get(TimespanUnit.Chart),
        // day
        Timespan.get(TimespanUnit.DAY, 1),
        Timespan.get(TimespanUnit.DAY, 3),
        // week
        Timespan.get(TimespanUnit.Week, 1),
        Timespan.get(TimespanUnit.Week, 2),
        Timespan.get(TimespanUnit.Week, 3),
        //month
        Timespan.get(TimespanUnit.Month, 1),
        Timespan.get(TimespanUnit.Month, 3),
        Timespan.get(TimespanUnit.Month, 6),
        Timespan.get(TimespanUnit.Month, 9),
        // year
        Timespan.get(TimespanUnit.Year, 1),
        Timespan.get(TimespanUnit.Year, 2),
        Timespan.get(TimespanUnit.Year, 3),
        Timespan.get(TimespanUnit.Year, 5),
        // max
        Timespan.get(TimespanUnit.Max),
    ];

    public readonly availableTimespanIndicators: TimespanIndicator[];

    private readonly _activeTimespansSet = new ToggleActiveSet<Timespan>();

    constructor(
        private settingsService: SettingsService
    ) {
        // default active
        this._activeTimespansSet.setActive(this.availableTimespans[1], true);
        this._activeTimespansSet.setActive(this.availableTimespans[3], true);
        this._activeTimespansSet.setActive(this.availableTimespans[4], true);
        this._activeTimespansSet.setActive(this.availableTimespans[6], true);
        this._activeTimespansSet.setActive(this.availableTimespans[7], true);
        this._activeTimespansSet.setActive(this.availableTimespans[8], true);
        this._activeTimespansSet.setActive(this.availableTimespans[10], true);

        this.availableTimespanIndicators = this.availableTimespans.map(
            t => TimespanIndicator.get(t, settingsService)
        );
    }

    get activeTimespans(): Timespan[] {
        return this.availableTimespans.filter(t => this.isActive(t));
    }

    get activeTimespanIndicators(): TimespanIndicator[] {
        return this.availableTimespanIndicators.filter(ti => this.isActive(ti.timespan));
    }

    public toggleActive(timespan: Timespan): void {
        this._activeTimespansSet.toggleActive(timespan);
    }

    public isActive(timespan: Timespan): boolean {
        return this._activeTimespansSet.isActive(timespan);
    }

    public clearActiveTimespans(): void {
        this._activeTimespansSet.clear();
    }

}
