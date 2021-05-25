import { Chart } from "../models/chart";
import { YahooChartApiResult } from "../models/yahoo-chart-api-result";

export class YahooChartApiConverter {

    public static convert(apiResult: YahooChartApiResult): Chart {
        const meta = apiResult.chart.result[0].meta;
        const timestamps = apiResult.chart.result[0].timestamp;
        const quotes = apiResult.chart.result[0].indicators.quote[0];

        const length = timestamps.length;

        const chart: Chart = {
            symbol: meta.symbol,
            entries: []
        }

        for (let i = 0; i < length; i++) {
            chart.entries.push({
                timestamp: timestamps[i],
                close: quotes.close[i],
                open: quotes.open[i],
                low: quotes.low[i],
                high: quotes.high[i],
                volume: quotes.volume[i]
            });
        }

        return chart;
    }

}