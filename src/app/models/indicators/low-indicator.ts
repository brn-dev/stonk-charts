import { Timespan } from "../timespan";
import { DeltaIndicator } from './indicator';
import { FullAssetData } from '../asset-data/full-asset-data';

export class LowIndicator extends DeltaIndicator {

    private static _timespanLowIndicatorMap = new Map<Timespan, LowIndicator>();

    public static get(timespan: Timespan): LowIndicator {
        if (this._timespanLowIndicatorMap.has(timespan)) {
            return this._timespanLowIndicatorMap.get(timespan);
        }

        const indicator = new LowIndicator(timespan);
        this._timespanLowIndicatorMap.set(timespan, indicator);
        return indicator;
    }

    public isPercent = true;

    private constructor(private timespan: Timespan) {
        super(timespan.displayText + ' Low', timespan.displayText + ' Low');
    }

    public compute(assetData: FullAssetData): number {
        const chart = assetData?.chart ?? null;
        const days = this.timespan.toDays().amount;
        const entriesLength = chart?.entries.length ?? 0;

        if (entriesLength === 0) {
            return null;
        }

        let low = chart.entries[entriesLength - 1].low;

        for (let i = 2; i < days + 1 && entriesLength - i >= 0; i++) {
            const l = chart.entries[entriesLength - i].low;
            if (!l) {
                continue;
            }
            if (!low || l < low) {
                low = l;
            }
        }

        const diff = chart.entries[entriesLength - 1].close - low;

        if (!this.isValidNumber(diff) || !this.isValidNumber(low)) {
            return null;
        }

        return diff / low;
    }

}
