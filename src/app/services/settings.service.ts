import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _chartDays = 40;

  // readonly
  public readonly fetchOnAdd = true;

  // editable on UI
  public showDates = false;

  public showTimespans = false;
  
  public showPositions = false;

  public showCharts = true;

  public showTags = true;

  public showOneYearEstimation = true;

  public showDescriptions = true;

  public $chartDaysUpdated = new Subject<number>();

  get chartDays() {
    return this._chartDays;
  }

  set chartDays(days: number) {
    this._chartDays = days;
    this.$chartDaysUpdated.next(days);
  }

  constructor() { }
}
