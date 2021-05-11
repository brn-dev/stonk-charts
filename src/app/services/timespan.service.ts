import { Injectable } from '@angular/core';
import { Timespan, TimespanUnit } from '../models/timespan';

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
  ]

  private readonly _activeTimespans = new Set<Timespan>();

  constructor() { 
    // default active
    this._activeTimespans.add(this.availableTimespans[1]);
    this._activeTimespans.add(this.availableTimespans[3]);
    this._activeTimespans.add(this.availableTimespans[4]);
    this._activeTimespans.add(this.availableTimespans[6]);
    this._activeTimespans.add(this.availableTimespans[7]);
    this._activeTimespans.add(this.availableTimespans[8]);
    this._activeTimespans.add(this.availableTimespans[10]);
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
