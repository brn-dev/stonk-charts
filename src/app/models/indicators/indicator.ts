import { NumberFormatUtils } from '../../utils/number-format-utils';
import { ColorInterpolation, interpolate } from '../../utils/color-interpolate';
import { ColorPalettes } from '../color-palettes';
import { FullAssetData } from '../asset-data/full-asset-data';

export abstract class Indicator<T> {

    public readonly positiveColorInterpolation: ColorInterpolation;
    public readonly negativeColorInterpolation: ColorInterpolation;

    protected constructor(
        public readonly shortDescription: string,
        public readonly longDescription: string,
        public readonly isPercent: boolean,
        positiveColorPalette: string[] | null,
        negativeColorPalette: string[] | null,
    ) {
        if (positiveColorPalette && positiveColorPalette.length > 0) {
            this.positiveColorInterpolation = interpolate(positiveColorPalette);
        } else {
            this.positiveColorInterpolation = () => ColorPalettes.DEFAULT_COLOR;
        }

        if (negativeColorPalette && negativeColorPalette.length > 0) {
            this.negativeColorInterpolation = interpolate(negativeColorPalette);
        } else {
            this.negativeColorInterpolation = () => ColorPalettes.DEFAULT_COLOR;
        }
    }

    public abstract compute(assetData: FullAssetData): T;

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
        positiveColorPalette: string[] | null,
        negativeColorPalette: string[] | null,
    ) {
        super(shortDescription, longDescription, true, positiveColorPalette, negativeColorPalette);
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
            ColorPalettes.DELTA_POSITIVE_COLOR_MAP,
            ColorPalettes.DELTA_NEGATIVE_COLOR_MAP,
        );
    }

}
