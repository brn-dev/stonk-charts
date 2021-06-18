import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { Chart } from '../models/chart';
import { Indicator } from '../models/indicators/indicator';
import { ChartCacheService } from './chart-cache.service';
import { PortfolioService } from './portfolio.service';

type IndicatorResults = Map<Indicator<any>, any>;

@Injectable({
    providedIn: 'root'
})
export class IndicatorResultCacheService {

    // Using Chart as key since if a new version of a chart arrives, it gets recalculated
    // TODO: maybe clean up old versions of charts
    private chartIndicatorResults = new Map<Chart, IndicatorResults>();

    constructor(
        private chartCacheService: ChartCacheService,
        private portfolioService: PortfolioService,
    ) {
    }


    public calculateResult<T>(
        asset: Asset,
        indicator: Indicator<T>
    ): T {
        const chart = this.chartCacheService.getForAsset(asset);
        const assetInvestmentInfo = this.portfolioService.getInvestmentInfoForAsset(asset);

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
