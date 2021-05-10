import { AssetSymbol } from "../../models/asset-symbol";
import { Chart } from "../../models/chart";

export abstract class ApiService {

  abstract fetchChartFor(symbol: AssetSymbol): Promise<Chart>;

}
