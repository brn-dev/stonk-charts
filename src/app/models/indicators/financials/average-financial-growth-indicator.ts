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

        const count = yearlyValues.length;

        let latestValue = yearlyValues[0];
        if (latestValue <= 0) {
            if (count > 1) {
                latestValue = yearlyValues[1];
            } else {
                return null;
            }
        }

        let oldestValue = yearlyValues[count - 1];
        if (oldestValue <= 0) {
            if (count > 1) {
                oldestValue = yearlyValues[count - 2];
            } else {
                return null;
            }
        }

        return MathUtils.nthRoot(latestValue / oldestValue, count) - 1;
    }


}