import { Chart } from './chart';
import { AssetStatistics } from './asset-statistics';

export interface BasicAssetData {
    symbol: string;
    chart: Chart | null;
    statistics: AssetStatistics | null;
}
