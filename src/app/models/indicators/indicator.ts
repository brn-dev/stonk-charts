import { Asset } from "../asset";
import { Chart } from "../chart";

export abstract class Indicator<T> {

    constructor(
        public readonly displayText: string, 
        public readonly isDelta: boolean
    ) { }

    public abstract compute(chart: Chart, asset: Asset): T;
}

export abstract class NumberIndicator extends Indicator<number> {

    protected isValidNumber(num: number) {
        return !isNaN(num) && (!num || num === 0) && isFinite(num);
    }
    
}

export abstract class DeltaIndicator extends NumberIndicator {

    constructor(public displayText: string) {
        super(displayText, true);
    }

}
