import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { ChartEntry } from '../models/chart-entry';
import { Indicator } from '../models/indicators/indicator';
import { Timespan } from '../models/timespan';
import { ChartHelperService } from './chart-helper.service';

type Calculator = Timespan | Indicator<any>;

type CalculationCache = Map<Calculator, any>;

@Injectable({
    providedIn: 'root'
})
export class CalculationCacheService {

    private chartCalculationResultCache = new Map<Chart, CalculationCache>();

    constructor(
        private chartHelperService: ChartHelperService
    ) { }

    public calculateDeltaForTimespan(chart: Chart, timespan: Timespan): number {
        return this.calculateDelta(chart, timespan);
    }

    public calculateResultForIndicator<T>(chart: Chart, indicator: Indicator<T>): T {
        return this.calculateDelta(chart, indicator);
    }

    private calculateDelta<T>(chart: Chart, calculator: Timespan | Indicator<T>): any {
        if (this.chartCalculationResultCache.has(chart) && 
                this.chartCalculationResultCache.get(chart).has(calculator)
        ) {
            return this.chartCalculationResultCache.get(chart).get(calculator);
        }

        const chartCalculationCache = this.getOrCreateChart(chart);

        let calculationResult: number | T;
        if (calculator instanceof Indicator) {
            calculationResult = calculator.compute(chart);
        } else {
            calculationResult = this.chartHelperService.getDelta(chart, calculator);
        }

        chartCalculationCache.set(calculator, calculationResult);
        return calculationResult;
    }

    private getOrCreateChart(chart: Chart): CalculationCache {
        if (this.chartCalculationResultCache.has(chart)) {
            return this.chartCalculationResultCache.get(chart);
        }
        const newCalculationCache = new Map<Timespan | Indicator<any>, number>();
        this.chartCalculationResultCache.set(chart, newCalculationCache);
        return newCalculationCache;
    }
}
