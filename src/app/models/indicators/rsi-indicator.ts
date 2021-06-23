import { Timespan } from "../timespan";
import { NumberIndicator } from "./indicator";
import { AssetData } from '../asset-data/asset-data';
import { ColorMaps } from '../color-maps';

export class RsiIndicator extends NumberIndicator {

    private static _timespanRsiIndicatorMap = new Map<Timespan, RsiIndicator>();

    public static get(timespan: Timespan): RsiIndicator {
        if (this._timespanRsiIndicatorMap.has(timespan)) {
            return this._timespanRsiIndicatorMap.get(timespan);
        }

        const indicator = new RsiIndicator(timespan);
        this._timespanRsiIndicatorMap.set(timespan, indicator);
        return indicator;
    }
    
    public isPercent = false;

    private constructor(private timespan: Timespan) {
        super(
            'RSI ' + timespan.displayText,
            'RSI ' + timespan.displayText,
            false,
            ColorMaps.POSITIVE_ONLY_COLOR_MAP,
            null
        );
    }

    public compute(assetData: AssetData): number {
        const chart = assetData?.chart ?? null;
        const entries = chart?.entries;
        const entriesLength = entries?.length ?? 0;
        const rsiPeriod = this.timespan.toDays().amount;
        const days = rsiPeriod + 1;

        if (entriesLength < days) {
            return null;
        }

        const ups: number[] = [];
        const downs: number[] = [];

        for (let i = entriesLength - (days + 1); i < entriesLength - 1; i++) {
            const currentDayClose = entries[i].close;
            const nextDayClose = entries[i + 1].close;
            if (!currentDayClose || !nextDayClose) {
                continue;
            }
            const change = nextDayClose - currentDayClose;
            ups.push(change > 0 ? change : 0);
            downs.push(change < 0 ? -change : 0);
        }

        const avgU = this.avg(ups);
        const avgD = this.avg(downs);

        const rs = avgU / avgD;

        const rsi = 100 - 100 / (1 + rs);

        return Math.round(rsi * 100) / 100;
    }

    public toDisplayFormat(computationResult: number): string {
        return computationResult?.toString() ?? null;
    }

    private avg(numbers: number[]) {
        return this.sum(numbers) / numbers.length;
    }

    private sum(numbers: number[]) {
        let sum = 0;
        for (const num of numbers) {
            sum += num;
        }
        return sum;
    }

}