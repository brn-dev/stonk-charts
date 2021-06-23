import { NumberIndicator } from '../indicator';
import { Asset } from '../../asset';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { AssetData } from '../../asset-data/asset-data';

export class AllocationAmountIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AllocationAmountIndicator();

    public static get singleton(): AllocationAmountIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Alloc $', 'Allocation $', false, null, null);

    }

    public compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.allocationAmount ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}$`;
    }

}