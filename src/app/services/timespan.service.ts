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
        new Timespan(0, TimespanUnit.Chart),
        // day
        new Timespan(1, TimespanUnit.DAY),
        new Timespan(3, TimespanUnit.DAY),
        // week
        new Timespan(1, TimespanUnit.Week),
        new Timespan(2, TimespanUnit.Week),
        new Timespan(3, TimespanUnit.Week),
        //month
        new Timespan(1, TimespanUnit.Month),
        new Timespan(3, TimespanUnit.Month),
        new Timespan(6, TimespanUnit.Month),
        new Timespan(9, TimespanUnit.Month),
        // year
        new Timespan(1, TimespanUnit.Year),
        new Timespan(2, TimespanUnit.Year),
        new Timespan(3, TimespanUnit.Year),
        new Timespan(5, TimespanUnit.Year),
        // max
        new Timespan(0, TimespanUnit.Max),
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
            t => new TimespanIndicator(t, settingsService)
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
