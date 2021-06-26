import { NumberIndicator, PercentIndicator } from '../indicator';
import { Asset } from '../../asset';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { AssetData } from '../../asset-data/asset-data';
import { ColorPalettes } from '../../color-palettes';

export class ExposurePercentIndicator extends PercentIndicator {

    private static SINGLETON_INSTANCE = new ExposurePercentIndicator();

    public static get singleton(): ExposurePercentIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Exp %', 'Exposure %', ColorPalettes.POSITIVE_ONLY_COLOR_MAP, null);

    }

    public compute(assetData: AssetData, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.exposurePercent ?? null;
    }

}