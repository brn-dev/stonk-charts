import { Injectable } from '@angular/core';
import { NumberIndicator } from '../../models/indicators/indicator';
import { BasicAssetDataCacheService } from '../asset-data/basic-asset-data-cache.service';
import { IndicatorResultCacheService } from './indicator-result-cache.service';
import { FilterStateService } from '../asset/filter-state.service';
import { FilterService } from '../asset/filter.service';

@Injectable({
    providedIn: 'root'
})
export class IndicatorMinMaxService {

    private indicatorMins: Map<NumberIndicator, number>;
    private indicatorMaxs: Map<NumberIndicator, number>;

    constructor(
        private indiciatorResultCacheService: IndicatorResultCacheService,
        private filterStateService: FilterStateService,
        private filterService: FilterService,
        private assetDataCacheService: BasicAssetDataCacheService,
    ) {
        this.reset();
        this.filterStateService.$filterUpdated.subscribe(() => this.reset());
        this.assetDataCacheService.$assetUpdated.subscribe(() => this.reset());
    }

    public getMinForVisibleCharts(indicator: NumberIndicator): number {
        if (!this.indicatorMins.has(indicator)) {
            this.calculateForVisibleCharts(indicator);
        }
        return this.indicatorMins.get(indicator);
    }

    public getMaxForVisibleCharts(indicator: NumberIndicator): number {
        if (!this.indicatorMaxs.has(indicator)) {
            this.calculateForVisibleCharts(indicator);
        }

        return this.indicatorMaxs.get(indicator);
    }


    private calculateForVisibleCharts(indicator: NumberIndicator): void {
        let min = 0;
        let max = 0;

        if (this.filterService.filteredAssets && this.filterService.filteredAssets.length > 1) {
            for (const asset of this.filterService.filteredAssets) {
                const result = this.indiciatorResultCacheService.calculateResult(asset, indicator);

                if (result === null || !isFinite(result)) {
                    continue;
                }

                if (result < min) {
                    min = result;
                } else if (result > max) {
                    max = result;
                }
            }
        }

        this.indicatorMins.set(indicator, min);
        this.indicatorMaxs.set(indicator, max);
    }

    private reset(): void {
        this.resetMins();
        this.resetMaxs();
    }

    private resetMins(): void {
        this.indicatorMins = new Map<NumberIndicator, number>();
    }

    private resetMaxs(): void {
        this.indicatorMaxs = new Map<NumberIndicator, number>();
    }
}
