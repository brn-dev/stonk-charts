import { Chart } from "../chart";

export interface Indicator {

    displayText: string;

    isDelta: boolean;

    compute(chart: Chart): number;

}
