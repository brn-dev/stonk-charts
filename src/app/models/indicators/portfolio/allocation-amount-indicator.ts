import { NumberIndicator } from '../indicator';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class AllocationAmountIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AllocationAmountIndicator();

    public static get singleton(): AllocationAmountIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc $', 'Allocation $', false, null, null);

    }

    public compute(assetData: FullAssetData): number {
        return assetData.portfolioInfo?.allocationAmount ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}$`;
    }

}