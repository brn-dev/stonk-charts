
export class Calculator {

    public static calculateDelta(now: number, past: number): number | null {
        return now / past - 1;
    }
}
