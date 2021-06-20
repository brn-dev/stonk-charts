import { NumberIndicator } from '../indicator';
import { Asset } from '../../asset';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { AssetData } from '../../asset-data/asset-data';

export class ExposureAmountIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new ExposureAmountIndicator();

    public static get singleton(): ExposureAmountIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Exp $', 'Exposure $', false);

    }

    public compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.exposureAmount ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}$`;
    }

}