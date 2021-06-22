import { Asset } from '../asset';
import { PortfolioAssetInvestmentInfo } from '../portfolio-asset-investment-info';
import { AssetData } from '../asset-data/asset-data';

export abstract class Indicator<T> {

    protected constructor(
        public readonly shortDescription: string,
        public readonly longDescription: string,
        public readonly isPercent: boolean
    ) {
    }

    public abstract compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): T;

    public abstract toDisplayFormat(computationResult: T): string;
}

export abstract class NumberIndicator extends Indicator<number> {

    protected isValidNumber(num: number): boolean {
        return !isNaN(num) && (num || num === 0) && isFinite(num);
    }

}

export abstract class DeltaIndicator extends NumberIndicator {

    protected constructor(shortDescription: string, longDescription: string) {
        super(shortDescription, longDescription, true);
    }

    public toDisplayFormat(): string {
        throw new Error('Delta indicators do not have a display format (use delta-component instead)');
    }

}
