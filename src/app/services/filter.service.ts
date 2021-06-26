// noinspection JSMethodCanBeStatic

import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { AssetService } from './asset.service';
import { FilterStateService } from './filter-state.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    constructor(
        private readonly assetService: AssetService,
        private readonly filterStateService: FilterStateService,
    ) {
        this.filterStateService.enabledTagsState.enableAllTags();
    }

    get filteredAssets(): Asset[] {
        if (this.filterStateService.enabledTagsState.areAllTagsEnabled &&
            this.filterStateService.excludedTagsState.areNoTagsExcluded &&
            this.filterStateService.requiredTagsState.areNoTagsRequired &&
            !this.filterStateService.searchTerm
        ) {
            return this.assetService.assets;
        }

        if (this.filterStateService.enabledTagsState.areNoTagsEnabled) {
            return [];
        }

        const assets: Asset[] = [];
        for (const asset of this.assetService.assets) {
            if (asset.tags.some(tag => this.filterStateService.enabledTagsState.isTagEnabled(tag)) &&
                !asset.tags.some(tag => this.filterStateService.excludedTagsState.isTagExcluded(tag)) &&
                this.doesSearchTermContain(asset.symbol) &&
                this.matchesRequiredTags(asset)
            ) {
                assets.push(asset);
            }
        }
        
        return assets;
    }

    private doesSearchTermContain(symbol: string): boolean {
        symbol = symbol.toLowerCase();
        const searchTerm = this.replaceAll(this.filterStateService.searchTerm.toLowerCase(), ';', ',');

        if (searchTerm.length === 0) {
            return true;
        }

        if (searchTerm.includes(',')) {
            const searchTerms = searchTerm.split(',');
            for (const term of searchTerms) {
                if (term.length > 0 && symbol === term) {
                    return true;
                }
            }
        } else {
            return symbol.includes(searchTerm);
        }
    }

    private replaceAll(str: string, searchTerm: string, replaceValue: string): string {
        return str.split(searchTerm).join(replaceValue);
    }

    private matchesRequiredTags(asset: Asset): boolean {
        return this.filterStateService.requiredTagsState.areNoTagsRequired ||
            asset.tags.some(tag => this.filterStateService.requiredTagsState.isTagRequired(tag));
    }

}
