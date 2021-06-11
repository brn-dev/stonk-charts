import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { Indicator } from '../models/indicators/indicator';
import { ChartHelper } from '../utils/chart-helper';
import { CacheService } from './cache.service';
import { FilterService } from './filter.service';

type IndicatorResults = Map<Indicator<any>, any>;

@Injectable({
    providedIn: 'root'
})
export class IndicatorResultCacheService {

    private chartIndicatorResults = new Map<Chart, IndicatorResults>();

    public calculateResult<T>(chart: Chart, indicator: Indicator<T>): T {
        if (this.chartIndicatorResults.has(chart) && 
                this.chartIndicatorResults.get(chart).has(indicator)
        ) {
            return this.chartIndicatorResults.get(chart).get(indicator);
        }
        const calculationResult = indicator.compute(chart);
        
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
