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
        private readonly tagStateService: FilterStateService,
    ) {
        this.tagStateService.enabledTagsState.enableAllTags();
    }

    get filteredAssets(): Asset[] {
        if (this.tagStateService.enabledTagsState.areAllTagsEnabled &&
            this.tagStateService.excludedTagsState.areNoTagsExcluded &&
            !this.tagStateService.searchTerm
        ) {
            return this.assetService.assets;
        }

        if (this.tagStateService.enabledTagsState.areNoTagsEnabled) {
            return [];
        }

        const assets: Asset[] = [];
        for (const asset of this.assetService.assets) {
            if (asset.tags.some(tag => this.tagStateService.enabledTagsState.isTagEnabled(tag)) &&
                !asset.tags.some(tag => this.tagStateService.excludedTagsState.isTagExcluded(tag)) &&
                this.doesSearchTermContain(asset.symbol)
            ) {
                assets.push(asset);
            }
        }
        
        return assets;
    }

    private doesSearchTermContain(symbol: string): boolean {
        symbol = symbol.toLowerCase();
        const searchTerm = this.replaceAll(this.tagStateService.searchTerm.toLowerCase(), ';', ',');

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

}
