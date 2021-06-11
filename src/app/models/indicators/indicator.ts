import { Chart } from "../chart";

export abstract class Indicator<T> {

    constructor(
        public readonly displayText: string, 
        public readonly isDelta: boolean
    ) { }

    public abstract compute(chart: Chart): T;
}

export abstract class NumberIndicator extends Indicator<number> {
    
}

export abstract class DeltaIndicator extends NumberIndicator {

    constructor(public displayText: string) {
        super(displayText, true);
    }

}
