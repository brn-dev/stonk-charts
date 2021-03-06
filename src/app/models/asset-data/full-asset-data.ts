import { BasicAssetData } from './basic-asset-data';
import { Asset } from '../asset';
import { PortfolioAssetInvestmentInfo } from '../portfolio-asset-investment-info';
import { AssetFinancials } from './asset-financials';
import { Estimation } from './estimation';

export interface FullAssetData extends BasicAssetData {
    asset: Asset;
    portfolioInfo: PortfolioAssetInvestmentInfo;
    financials: AssetFinancials;
    estimation: Estimation;
}