import { Component, Input, OnInit } from '@angular/core';
import { Timespan } from '../../models/timespan';
import { SettingsService } from '../../services/settings.service';
import { DateUtils } from '../../utils/date-utils';
import { NumberFormatUtils } from '../../utils/number-format-utils';

const interpolate: (colors: string[]) => ((interpolationFraction: number) => string) = window.require('color-interpolate');

@Component({
    selector: 'app-delta',
    templateUrl: './delta.component.html',
    styleUrls: ['./delta.component.scss']
})
export class DeltaComponent implements OnInit {

    private static readonly ROOT_EXPONENT = 0.3;
    
    private static readonly positiveColorMap = interpolate(['#3b453b', '#378243', '#00e335']);
    private static readonly negativeColorMap = interpolate(['#261919', '#ad2323', '#f90000']);

    @Input()
    public delta: number;

    @Input()
    public min: number;

    @Input()
    public max: number;

    @Input()
    public timestamp: number;

    @Input()
    public timespan: Timespan;

    constructor(public settingsService: SettingsService) {
    }

    ngOnInit(): void {
    }

    get color(): string {
        if (!this.delta) {
            return 'black';
        }

        if (this.delta > 0) {
            if (!this.max) {
                return DeltaComponent.positiveColorMap(0.6);
            }
            return DeltaComponent.positiveColorMap(this.root(this.delta / this.max));
        } else if (this.delta < 0) {
            if (!this.min) {
                return DeltaComponent.negativeColorMap(0.6);
            }
            return DeltaComponent.negativeColorMap(this.root(this.delta / this.min));
        }
        return 'black';
    }

    get date(): string {
        if (!this.timestamp) {
            return '';
        }

        return DateUtils.toIsoString(this.timestamp);
    }

    get deltaPercent(): number {
        if (this.delta === null || this.delta === undefined) {
            return null;
        }
        return NumberFormatUtils.toPercent(this.delta);
    }

    private root(fraction: number) {
        return Math.pow(fraction, DeltaComponent.ROOT_EXPONENT);
    }

}
