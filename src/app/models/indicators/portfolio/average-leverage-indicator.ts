import { Indicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';

export class AverageLeverageIndicator extends Indicator<string> {

    private static SINGLETON_INSTANCE = new AverageLeverageIndicator();

    public static get singleton(): AverageLeverageIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Lev', 'Leverage', false);

    }

    compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): string {
        if (!assetInvestmentInfo?.averageLeverage) {
            return null;
        }
        return `X${NumberFormatUtils.roundTo2DecimalPlaces(assetInvestmentInfo.averageLeverage)}`;
    }

}