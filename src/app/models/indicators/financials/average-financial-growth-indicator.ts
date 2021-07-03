import { DeltaIndicator } from '../indicator';
import { FullAssetData } from '../../asset-data/full-asset-data';
import { MathUtils } from '../../../utils/math-utils';
import { AssetFinancials } from '../../asset-data/asset-financials';


export class AverageFinancialGrowthIndicator extends DeltaIndicator {

    public static averageRevenueGrowthIndicator = new AverageFinancialGrowthIndicator(
        'yearlyRevenues',
        'RG (avg)',
        'Avg. Rev. Growth',
    );

    public static averageAssetsGrowthIndicator = new AverageFinancialGrowthIndicator(
        'yearlyTotalAssets',
        'AG (avg)',
        'Avg. Ass. Growth',
    );

    private constructor(
        private field: keyof AssetFinancials,
        shortDescription: string,
        longDescription: string,
    ) {
        super(
            shortDescription,
            longDescription,
        );
    }

    public compute(assetData: FullAssetData): number {
        if (!assetData.financials) {
            return null;
        }

        const yearlyValues = assetData.financials[this.field];

        let count = yearlyValues.length;

        let latestValue = yearlyValues[0];
        if (latestValue <= 0) {
            if (yearlyValues.length > 1) {
                latestValue = yearlyValues[1];
                count--;
            } else {
                return null;
            }
        }

        let oldestValue = yearlyValues[yearlyValues.length - 1];
        if (oldestValue <= 0) {
            if (yearlyValues.length > 1) {
                oldestValue = yearlyValues[yearlyValues.length - 2];
                count--;
            } else {
                return null;
            }
        }

        return MathUtils.nthRoot(latestValue / oldestValue, count) - 1;
    }


}