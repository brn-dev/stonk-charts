
export class NumberFormatUtils {

    public static toPercent(num: number): number {
        if (num === null || num === undefined) {
            return null;
        }
        return this.roundTo2DecimalPlaces(num * 100);
    }

    public static roundTo2DecimalPlaces(num: number): number {
        if (num === null || num === undefined) {
            return null;
        }
        return +(Math.round(num * 100) / 100).toFixed(2);
    }

}