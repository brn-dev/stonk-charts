import { Asset } from '../asset';
import { PortfolioAssetInvestmentInfo } from '../portfolio-asset-investment-info';
import { AssetData } from '../asset-data/asset-data';
import { NumberFormatUtils } from '../../utils/number-format-utils';
import { ColorInterpolation, interpolate } from '../../utils/color-interpolate';
import { ColorMaps } from '../color-maps';

export abstract class Indicator<T> {

    public readonly positiveColorInterpolation: ColorInterpolation;
    public readonly negativeColorInterpolation: ColorInterpolation;

    protected constructor(
        public readonly shortDescription: string,
        public readonly longDescription: string,
        public readonly isPercent: boolean,
        positiveColorMap: string[] | null,
        negativeColorMap: string[] | null,
    ) {
        if (positiveColorMap && positiveColorMap.length > 0) {
            this.positiveColorInterpolation = interpolate(positiveColorMap);
        } else {
            this.positiveColorInterpolation = () => ColorMaps.DEFAULT_COLOR;
        }

        if (negativeColorMap && negativeColorMap.length > 0) {
            this.negativeColorInterpolation = interpolate(negativeColorMap);
        } else {
            this.negativeColorInterpolation = () => ColorMaps.DEFAULT_COLOR;
        }
    }

    public abstract compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): T;

    public abstract toDisplayFormat(computationResult: T): string;
}

export abstract class NumberIndicator extends Indicator<number> {

    protected isValidNumber(num: number): boolean {
        return !isNaN(num) && (num || num === 0) && isFinite(num);
    }

}

export abstract class PercentIndicator extends NumberIndicator {

    protected constructor(
        shortDescription: string,
        longDescription: string,
        positiveColorMap: string[] | null,
        negativeColorMap: string[] | null,
    ) {
        super(shortDescription, longDescription, true, positiveColorMap, negativeColorMap);
    }

    public toDisplayFormat(num: number): string {
        if (!this.isValidNumber(num)) {
            return null;
        }
        return NumberFormatUtils.toPercentString(num);
    }

}

export abstract class DeltaIndicator extends PercentIndicator {

    protected constructor(
        shortDescription: string,
        longDescription: string,
    ) {
        super(
            shortDescription,
            longDescription,
            ColorMaps.DELTA_POSITIVE_COLOR_MAP,
            ColorMaps.DELTA_NEGATIVE_COLOR_MAP,
        );
    }

}
