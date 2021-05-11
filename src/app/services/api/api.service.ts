import { Asset } from "../../models/asset";
import { Chart } from "../../models/chart";

export abstract class ApiService {

  abstract fetchChartFor(asset: Asset): Promise<Chart>;

}
