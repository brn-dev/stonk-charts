import { Component, Input, OnInit } from '@angular/core';
import { Timespan } from '../../models/timespan';
import { SettingsService } from '../../services/settings.service';
import { DateUtils } from '../../utils/date-utils';

@Component({
    selector: 'app-delta',
    templateUrl: './delta.component.html',
    styleUrls: ['./delta.component.scss']
})
export class DeltaComponent implements OnInit {

    @Input()
    public delta: number;

    @Input()
    public timestamp: number;

    @Input()
    public timespan: Timespan;

    constructor(public settingsService: SettingsService) {
    }

    ngOnInit(): void {
    }

    get date(): string {
        if (!this.timestamp) {
            return '';
        }

        return DateUtils.toIsoString(this.timestamp);
    }

    get deltaPercent(): string {
        if (this.delta === null || this.delta === undefined) {
            return null;
        }
        return (Math.round(this.delta * 10000) / 100).toFixed(2);
    }

}
