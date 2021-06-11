import { SettingsService } from "../../services/settings.service";
import { ChartHelper } from "../../utils/chart-helper";
import { DateUtils } from "../../utils/date-utils";
import { Chart } from "../chart";
import { Timespan } from "../timespan";
import { DeltaIndicator, Indicator } from "./indicator";

export class TimespanIndicator extends DeltaIndicator {

    constructor(
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