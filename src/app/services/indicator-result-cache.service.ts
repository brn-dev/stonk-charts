import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { Chart } from '../models/chart';
import { Indicator } from '../models/indicators/indicator';
import { PortfolioAssetInvestmentInfo } from '../models/portfolio-asset-investment-info';

type IndicatorResults = Map<Indicator<any>, any>;

@Injectable({
    providedIn: 'root'
})
export class IndicatorResultCacheService {

    // Using Chart as key since if a new version of a chart arrives, it gets recalculated
    // TODO: maybe clean up old versions of charts
    private chartIndicatorResults = new Map<Chart, IndicatorResults>();

    public calculateResult<T>(
        chart: Chart,
        asset: Asset,
        assetInvestmentInfo: PortfolioAssetInvestmentInfo,
        indicator: Indicator<T>
    ): T {
        if (this.chartIndicatorResults.has(chart) &&
            this.chartIndicatorResults.get(chart).has(indicator)
        ) {
            return this.chartIndicatorResults.get(chart).get(indicator);
        }
        const calculationResult = indicator.compute(chart, asset, assetInvestmentInfo);

        const indicatorResults = this.getOrCreateForChart(chart);
        indicatorResults.set(indicator, calculationResult);

        return calculationResult;
    }

    private getOrCreateForChart(chart: Chart): IndicatorResults {
        if (this.chartIndicatorResults.has(chart)) {
            return this.chartIndicatorResults.get(chart);
        }
        const newIndicatorResultsCache = new Map<Indicator<any>, any>();
        this.chartIndicatorResults.set(chart, newIndicatorResultsCache);
        return newIndicatorResultsCache;
    }
}
