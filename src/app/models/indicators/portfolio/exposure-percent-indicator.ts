import { NumberIndicator } from '../indicator';
import { Asset } from '../../asset';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';
import { AssetData } from '../../asset-data/asset-data';

export class ExposurePercentIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new ExposurePercentIndicator();

    public static get singleton(): ExposurePercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Exp %', 'Exposure %', false);

    }

    public compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.exposurePercent ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `${NumberFormatUtils.toPercent(computationResult)} %`;
    }

}