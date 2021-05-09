import { Injectable } from '@angular/core';
import { Timespan, TimespanUnit } from '../models/timespan';

@Injectable({
  providedIn: 'root'
})
export class TimespanService {

  public readonly availableTimespans: Timespan[] = [
    // day
    new Timespan(1, TimespanUnit.DAY),
    new Timespan(3, TimespanUnit.DAY),
    // week
    new Timespan(1, TimespanUnit.WEEK),
    new Timespan(2, TimespanUnit.WEEK),
    new Timespan(3, TimespanUnit.WEEK),
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
  ]

  private readonly _activeTimespans = new Set<Timespan>();

  constructor() { 
    // default active
    this._activeTimespans.add(this.availableTimespans[0]);
    this._activeTimespans.add(this.availableTimespans[2]);
    this._activeTimespans.add(this.availableTimespans[3]);
    this._activeTimespans.add(this.availableTimespans[5]);
    this._activeTimespans.add(this.availableTimespans[6]);
    this._activeTimespans.add(this.availableTimespans[7]);
    this._activeTimespans.add(this.availableTimespans[9]);
  }

  get activeTimespans(): Timespan[] {
    return this.availableTimespans.filter(t => this.isActive(t));
  }

  public toggleActive(timespan: Timespan) {
    if (this._activeTimespans.has(timespan)) {
      this._activeTimespans.delete(timespan);
    } else {
      this._activeTimespans.add(timespan);
    }
  }

  public isActive(timespan: Timespan) {
    return this._activeTimespans.has(timespan);
  }

}
