
export class TimespanUnit {

    public static readonly DAY = new TimespanUnit('D', 'Days');
    public static readonly Week = new TimespanUnit('W', 'Week');
    public static readonly Month = new TimespanUnit('M', 'Month');
    public static readonly Year = new TimespanUnit('Y', 'Year');
    public static readonly Max = new TimespanUnit('Max', 'Max', true);

    public readonly shortName: string;
    public readonly longName: string;
    public readonly requiresNoAmount: boolean;

    private constructor(shortName: string, longName: string, requiresNoAmount = false) {
        this.shortName = shortName;
        this.longName = longName;
        this.requiresNoAmount = requiresNoAmount;
    }

}

export class Timespan {
    private static readonly NO_AMOUNT = -1;

    public static readonly WEEK_TO_DAYS = 5;
    public static readonly MONTH_TO_DAYS = 21;
    public static readonly YEAR_TO_DAYS = Timespan.MONTH_TO_DAYS * 12;

    private static readonly _timespanMap = new Map<TimespanUnit, Map<number, Timespan>>();

    public static get(unit: TimespanUnit, amount?: number): Timespan {
        if (unit.requiresNoAmount) {
            amount = this.NO_AMOUNT;
        }
        if (!amount) {
            throw Error(`The unit ${unit.shortName} requires an amount!`);
        }

        let unitMap = new Map<number, Timespan>();
        if (this._timespanMap.has(unit)) {
            unitMap = this._timespanMap.get(unit);
        } else {
            this._timespanMap.set(unit, unitMap);
        }

        if (unitMap.has(amount)) {
            return unitMap.get(amount);
        } else {
            const timespan = new Timespan(unit, amount);
            unitMap.set(amount, timespan);
            return timespan;
        }
    }

    public readonly unit: TimespanUnit;
    public readonly amount: number;

    private constructor(unit: TimespanUnit, amount: number) {
        this.unit = unit;
        this.amount = amount;

    }

    get displayText(): string {
        if (this.unit.requiresNoAmount) {
            return this.unit.shortName;
        }
        return `${this.amount}${this.unit.shortName}`;
    }

    public toDays(): Timespan {
        if (this.unit === TimespanUnit.DAY) {
            return Timespan.get(TimespanUnit.DAY, this.amount);
        }
        if (this.unit === TimespanUnit.Week) {
            return Timespan.get(TimespanUnit.DAY, this.amount * Timespan.WEEK_TO_DAYS);
        }
        if (this.unit === TimespanUnit.Month) {
            return Timespan.get(TimespanUnit.DAY, this.amount * Timespan.MONTH_TO_DAYS);
        }
        if (this.unit === TimespanUnit.Year) {
            return Timespan.get(TimespanUnit.DAY, this.amount * Timespan.YEAR_TO_DAYS);
        }
        throw new Error('Unknown TimespanUnit');
    }

}
