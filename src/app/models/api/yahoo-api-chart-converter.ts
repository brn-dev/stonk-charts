import { Chart } from "../asset-data/chart";
import {
    YahooApiGetChartsResult,
    YahooApiGetChartsResultComparison,
    YahooApiGetChartsResultQuotes
} from './yahoo-api-get-charts-result';

export class YahooApiChartConverter {

    public static convert(apiResult: YahooApiGetChartsResult): Map<string, Chart> {
        const timestamps = apiResult.chart.result[0].timestamp;
        const quotes = apiResult.chart.result[0].indicators.quote[0];
        const comparisions = apiResult.chart.result[0].comparisons ?? [];

        const chartsBySymbol = new Map<string, Chart>();

        chartsBySymbol.set(
            apiResult.chart.result[0].meta.symbol,
            this.convertChart(timestamps, quotes)
        );

        for (const comparision of comparisions) {
            chartsBySymbol.set(
                comparision.symbol,
                this.convertChart(timestamps, comparision)
            );
        }

        return chartsBySymbol;
    }

    private static convertChart(
        timestamps: number[],
        quotes: YahooApiGetChartsResultQuotes | YahooApiGetChartsResultComparison
    ): Chart {
        const chart: Chart = {
            entries: []
        };

        for (let i = 0; i < timestamps.length; i++) {
            chart.entries.push({
                timestamp: timestamps[i] * 1000,
                close: quotes.close[i],
                open: quotes.open[i],
                low: quotes.low[i],
                high: quotes.high[i],
            });
        }

        return chart;
    }

}