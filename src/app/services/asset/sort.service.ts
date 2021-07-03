import { Injectable } from '@angular/core';
import { Indicator, NumberIndicator } from '../../models/indicators/indicator';
import { FilterService } from './filter.service';
import { Asset } from '../../models/asset';
import { IndicatorResultCacheService } from '../indicator/indicator-result-cache.service';

@Injectable({
    providedIn: 'root'
})
export class SortService {

    public sortIndicator: Indicator<any> = null;
    public descending = false;

    constructor(
        private filterService: FilterService,
        private indicatorResultCacheService: IndicatorResultCacheService,
    ) {
    }

    get sortedAssets(): Asset[] {
        const assets = [...this.filterService.filteredAssets];

        if (!this.sortIndicator) {
            return assets;
        }

        const orderingModifier = this.descending ? -1 : 1;

        return assets.sort((a1, a2) => {
            const indicatorResult1 = this.indicatorResultCacheService.calculateResult(a1, this.sortIndicator);
            const indicatorResult2 = this.indicatorResultCacheService.calculateResult(a2, this.sortIndicator);

            if (indicatorResult1 === null) {
                return 1;
            }
            if (indicatorResult2 === null) {
                return -1;
            }

            if (indicatorResult1 > indicatorResult2) {
                return 1 * orderingModifier;
            } else if (indicatorResult1 < indicatorResult2) {
                return -1 * orderingModifier;
            }
            return 0;
        });
    }

    public setOrToggleSortIndicator(indicator: Indicator<any>): void {
        const defaultDescending = indicator instanceof NumberIndicator;
        if (this.sortIndicator !== indicator) {
            this.sortIndicator = indicator;
            this.descending = defaultDescending;
        } else if (this.descending === defaultDescending) {
            this.descending = !this.descending;
        } else {
            this.sortIndicator = null;
        }
    }
}
