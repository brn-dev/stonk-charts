import { Asset } from '../asset';
import { Chart } from '../chart';
import { PortfolioAsset } from '../portfolio';

export abstract class Indicator<T> {

    protected constructor(
        public readonly displayText: string,
        public readonly isDelta: boolean
    ) {
    }

    public abstract compute(chart: Chart, asset: Asset, portfolioAsset: PortfolioAsset): T;
}

export abstract class NumberIndicator extends Indicator<number> {

    protected isValidNumber(num: number): boolean {
        return !isNaN(num) && (!num || num === 0) && isFinite(num);
    }

}

export abstract class DeltaIndicator extends NumberIndicator {

    protected constructor(public displayText: string) {
        super(displayText, true);
    }

}
