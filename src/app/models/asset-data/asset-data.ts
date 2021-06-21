import { Chart } from './chart';
import { AssetStatistics } from './asset-statistics';

export interface AssetData {
    symbol: string;
    chart: Chart | null;
    statistics: AssetStatistics | null;
}
