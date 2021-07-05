import { DeltaIndicator } from '../indicator';
import { FullAssetData } from '../../asset-data/full-asset-data';
import { MathUtils } from '../../../utils/math-utils';
import { AssetFinancials } from '../../asset-data/asset-financials';


export class AverageFinancialGrowthIndicator extends DeltaIndicator {

    public static averageRevenueGrowthIndicator = new AverageFinancialGrowthIndicator(
        'yearlyRevenues',
        'Avg. RG',
        'Avg. Rev. Growth',
    );

    public static averageAssetsGrowthIndicator = new AverageFinancialGrowthIndicator(
        'yearlyTotalAssets',
        'Avg. AG',
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

        let latestValue: number;
        for (const value of yearlyValues) {
            if (value > 0) {
                latestValue = value;
                break;
            } else {
                count--;
            }
        }

        let oldestValue: number;
        for (let i = yearlyValues.length - 1; i >= 0; i--) {
            const value = yearlyValues[i];
            if (value > 0) {
                oldestValue = value;
                break;
            } else {
                count--;
            }
        }

        if (!latestValue || !oldestValue) {
            return null;
        }

        return MathUtils.nthRoot(latestValue / oldestValue, count) - 1;
    }


}