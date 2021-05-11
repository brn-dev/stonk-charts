
export class TimespanUnit {

    public static readonly DAY = new TimespanUnit('D', 'Days');
    public static readonly Week = new TimespanUnit('W', 'Week');
    public static readonly Month = new TimespanUnit('M', 'Month');
    public static readonly Year = new TimespanUnit('Y', 'Year');
    public static readonly Chart = new TimespanUnit('Chart', 'Chart', true);
    public static readonly Max = new TimespanUnit('Max', 'Max', true);

    public readonly shortName: string;
    public readonly longName: string;
    public readonly requiresNoAmount: boolean

    private constructor(shortName: string, longName: string, requiresNoAmount: boolean = false) {
        this.shortName = shortName;
        this.longName = longName;
        this.requiresNoAmount = requiresNoAmount;
    }

}

export class Timespan {

    public static readonly WEEK_TO_DAYS = 5;
    public static readonly MONTH_TO_DAYS = 21; 
    public static readonly YEAR_TO_DAYS = Timespan.MONTH_TO_DAYS * 12;

    public readonly amount: number;
    public readonly unit: TimespanUnit;

    constructor(amount: number, unit: TimespanUnit) {
        this.amount = amount;
        this.unit = unit;
    }

    get displayText() {
        if (this.unit.requiresNoAmount) {
            return this.unit.shortName;
        }
        return `${this.amount}${this.unit.shortName}`;
    }

    public toDays(): Timespan {
        if (this.unit === TimespanUnit.DAY) {
            return new Timespan(this.amount, TimespanUnit.DAY);
        }
        if (this.unit === TimespanUnit.Week) {
            return new Timespan(this.amount * Timespan.WEEK_TO_DAYS, TimespanUnit.DAY);
        }
        if (this.unit === TimespanUnit.Month) {
            return new Timespan(this.amount * Timespan.MONTH_TO_DAYS, TimespanUnit.DAY);
        }
        if (this.unit === TimespanUnit.Year) {
            return new Timespan(this.amount * Timespan.YEAR_TO_DAYS, TimespanUnit.DAY);
        }
        throw new Error('Unkown TimespanUnit');
    }
    
}
