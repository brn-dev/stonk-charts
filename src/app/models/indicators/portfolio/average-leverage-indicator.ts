import { NumberIndicator } from '../indicator';
import { Asset } from '../../asset';
import { Chart } from '../../chart';
import { PortfolioAssetInvestmentInfo } from '../../portfolio-asset-investment-info';
import { NumberFormatUtils } from '../../../utils/number-format-utils';

export class AverageLeverageIndicator extends NumberIndicator {

    private static SINGLETON_INSTANCE = new AverageLeverageIndicator();

    public static get singleton(): AverageLeverageIndicator {
        return this.SINGLETON_INSTANCE;
    }

    private constructor() {
        super('Lev', 'Leverage', false);

    }

    public compute(chart: Chart, asset: Asset, assetInvestmentInfo: PortfolioAssetInvestmentInfo): number {
        return assetInvestmentInfo?.averageLeverage ?? null;
    }

    public toDisplayFormat(computationResult: number): string {
        if (!computationResult) {
            return null;
        }
        return `X${NumberFormatUtils.roundTo2DecimalPlaces(computationResult)}`;
    }

}