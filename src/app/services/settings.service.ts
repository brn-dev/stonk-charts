import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private _chartDays = 40;

    public showDates = false;

    public showIndicatorNames = false;

    public showCharts = true;

    public showTags = true;

    public showDescriptions = true;

    public turnOffPercentColors = false;

    public turnOffNonPercentColors = false;

    public showSymbolsInAllColumns = false;

    public $chartDaysUpdated = new Subject<number>();

    get chartDays(): number {
        return this._chartDays;
    }

    set chartDays(days: number) {
        this._chartDays = days;
        this.$chartDaysUpdated.next(days);
    }

    constructor() { }
}
