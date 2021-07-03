import { DeltaIndicator } from '../indicator';
import { FullAssetData } from '../../asset-data/full-asset-data';

export class TrailingForwardPeRatioIndicator extends DeltaIndicator {

    private static SINGLETON_INSTANCE = new TrailingForwardPeRatioIndicator();

    public static get singleton(): TrailingForwardPeRatioIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super(
            'tr./fw. P/E',
            'tr./fw. P/E',
        );
    }

    public compute(assetData: FullAssetData): number {
        if (!assetData?.statistics ||
            !assetData.statistics.trailingPE ||
            !assetData.statistics.forwardPE
        ) {
            return null;
        }
        return assetData.statistics.trailingPE / assetData.statistics.forwardPE - 1;
    }

}
