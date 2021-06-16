import { SettingsService } from "../../services/settings.service";
import { ChartHelper } from "../../utils/chart-helper";
import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { DeltaIndicator } from "./indicator";

export class TimespanIndicator extends DeltaIndicator {

    private static _timespanTimespanIndicatorMap = new Map<Timespan, TimespanIndicator>();

    public static get(timespan: Timespan, settingsService: SettingsService): TimespanIndicator {
        if (this._timespanTimespanIndicatorMap.has(timespan)) {
            return this._timespanTimespanIndicatorMap.get(timespan);
        }

        const indicator = new TimespanIndicator(timespan, settingsService);
        this._timespanTimespanIndicatorMap.set(timespan, indicator);
        return indicator;
    }

    private constructor(
        public timespan: Timespan, 
        private settingsService: SettingsService
    ) {
        super(timespan.displayText);
    }

    public compute(chart: Chart): number {
        const now = ChartHelper.lastDay(chart);
        const past = ChartHelper.getDayInPastFromTimespan(chart, this.timespan, this.settingsService);

        if (!now?.close || !past?.close) {
            return null;
        }
        
        
        return ChartHelper.calculateDelta(now.close, past.close);
    }

}