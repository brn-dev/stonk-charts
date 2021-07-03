import { NumberIndicator } from '../indicator';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class ExposureAmountIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new ExposureAmountIndicator();

    public static get singleton(): ExposureAmountIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Exp $', 'Exposure $', false, null, null);

    }

    public compute(assetData: FullAssetData): number {
        return assetData.portfolioInfo?.exposureAmount ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}$`;
    }

}