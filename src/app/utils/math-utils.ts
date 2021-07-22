
export class MathUtils {

    public static calculateDelta(now: number, past: number): number | null {
        if (!now || !past) {
            return null;
        }
        return now / past - 1;
    }

    public static nthRoot(num: number, n: number): number {
        return Math.pow(num, 1 / n);
    }

}
