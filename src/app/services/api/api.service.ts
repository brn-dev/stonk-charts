import { Chart } from "../../models/chart";

export abstract class ApiService {

  abstract fetchChartFor(symbol: string): Promise<Chart>;

}
