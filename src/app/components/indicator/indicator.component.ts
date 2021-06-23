import { Component, Input } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Asset } from '../../models/asset';
import { Indicator, NumberIndicator } from '../../models/indicators/indicator';
import { IndicatorResultCacheService } from '../../services/indicator-result-cache.service';
import { IndicatorMinMaxService } from '../../services/indicator-min-max.service';
import { TimespanIndicator } from '../../models/indicators/timespan-indicator';
import { AssetDataCacheService } from '../../services/asset-data-cache.service';
import { Chart } from '../../models/asset-data/chart';
import { ChartHelper } from '../../utils/chart-helper';
import { DateUtils } from '../../utils/date-utils';
import { Timespan } from '../../models/timespan';
import { ColorMaps } from '../../models/color-maps';

@Component({
    selector: 'app-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent<T> {

    private static readonly ROOT_EXPONENT = 0.3;

    @Input()
    public asset: Asset;

    @Input()
    public indicator: Indicator<T>;

    constructor(
        private indicatorResultCacheService: IndicatorResultCacheService,
        private indicatorMinMaxService: IndicatorMinMaxService,
        private assetDataCacheService: AssetDataCacheService,
        public settingsService: SettingsService
    ) {
    }

    get indicatorResult(): T {
        return this.indicatorResultCacheService.calculateResult(this.asset, this.indicator);
    }

    get indicatorDisplayValue(): string {
        return this.indicator.toDisplayFormat(this.indicatorResult);
    }

    get chart(): Chart {
        if (!this.asset) {
            return null;
        }
        return this.assetDataCacheService.getForAsset(this.asset)?.chart ?? null;
    }

    get color(): string {
        if (this.indicator.isPercent && this.settingsService.turnOffPercentColors) {
            return ColorMaps.DEFAULT_COLOR;
        }
        if (!this.indicator.isPercent && this.settingsService.turnOffNonPercentColors) {
            return ColorMaps.DEFAULT_COLOR;
        }

        if (!(this.indicator instanceof NumberIndicator) || !this.indicatorResult) {
            return ColorMaps.DEFAULT_COLOR;
        }

        const indicatorResult = <number><unknown>this.indicatorResult;
        const max = this.indicatorMinMaxService.getMaxForVisibleCharts(this.indicator);
        const min = this.indicatorMinMaxService.getMinForVisibleCharts(this.indicator);

        if (indicatorResult > 0) {
            return this.indicator.positiveColorInterpolation(this.root(indicatorResult / max));
        } else if (indicatorResult < 0) {
            return this.indicator.negativeColorInterpolation(this.root(indicatorResult / min));
        }
        return ColorMaps.DEFAULT_COLOR;
    }

    get timespan(): Timespan {
        if (!(this.indicator instanceof TimespanIndicator)) {
            return null;
        }
        return this.indicator.timespan;
    }

    get date(): string {
        if (!this.timespan) {
            return null;
        }

        const timestamp = ChartHelper.getDayInPastFromTimespan(this.chart, this.timespan)?.timestamp;

        if (!timestamp) {
            return null;
        }

        return DateUtils.toIsoString(timestamp);
    }

    private root(fraction: number) {
        return Math.pow(fraction, IndicatorComponent.ROOT_EXPONENT);
    }

}
