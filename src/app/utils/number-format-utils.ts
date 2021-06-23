
export class NumberFormatUtils {

    public static toPercentString(num: number): string {
        if (num === null || num === undefined) {
            return null;
        }
        return `${this.toPercent(num)} %`;
    }

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

    public static format(num: number): string {
        const abs_num = Math.abs(num);
        if (abs_num >= 1_000_000_000_000) {
            return `${this.roundTo2DecimalPlaces(num / 1_000_000_000_000)} Tr`;
        }
        if (abs_num >= 1_000_000_000) {
            return `${this.roundTo2DecimalPlaces(num / 1_000_000_000)} Bn`;
        }
        if (abs_num >= 1_000_000) {
            return `${this.roundTo2DecimalPlaces(num / 1_000_000)} Ml`;
        }
        return this.roundTo2DecimalPlaces(num).toString();
    }

}