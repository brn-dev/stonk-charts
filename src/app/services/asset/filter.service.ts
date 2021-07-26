// noinspection JSMethodCanBeStatic

import { Injectable } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetService } from './asset.service';
import { FilterStateService } from './filter-state.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    constructor(
        private readonly assetService: AssetService,
        private readonly stateService: FilterStateService,
    ) {
        this.stateService.enabledTagsState.enableAllTags();
    }

    get filteredAssets(): Asset[] {
        if (this.stateService.enabledTagsState.allTagsEnabled &&
            this.stateService.excludedTagsState.noTagsExcluded &&
            this.stateService.requiredTagState.noTagRequired &&
            this.stateService.searchTermEmpty &&
            this.stateService.noAssetsHidden
        ) {
            return this.assetService.assets;
        }

        if (this.stateService.enabledTagsState.noTagsEnabled && this.stateService.requiredTagState.noTagRequired) {
            return [];
        }

        const searchTermEmpty = this.stateService.searchTermEmpty;
        const noTagRequired = this.stateService.requiredTagState.noTagRequired;
        const oneTagEnabled = this.stateService.enabledTagsState.enabledTagsCount === 1;

        const assets: Asset[] = [];
        for (const asset of this.assetService.assets) {
            const isHidden = this.stateService.isAssetHidden(asset);
            if (isHidden) {
                continue;
            }

            const matchesSearchTerm = this.doesSearchTermContain(asset.symbol);
            const notExcluded = !asset.tags.some(tag => this.stateService.excludedTagsState.isTagExcluded(tag));
            const matchesEnabled = asset.tags.some(tag => this.stateService.enabledTagsState.isTagEnabled(tag));
            const matchesRequired = asset.tags.some(tag => this.stateService.requiredTagState.isTagRequired(tag));
            const matchesEnabledWithoutRequired = asset.tags.some(
                tag => !this.stateService.requiredTagState.isTagRequired(tag) &&
                    this.stateService.enabledTagsState.isTagEnabled(tag)
            );

            if (matchesSearchTerm || (searchTermEmpty && notExcluded && (
                ((oneTagEnabled || noTagRequired) && matchesEnabled) ||
                (!noTagRequired && matchesRequired && matchesEnabledWithoutRequired)
            ))) {
                assets.push(asset);
            }
        }
        
        return assets;
    }

    private doesSearchTermContain(symbol: string): boolean {
        if (this.stateService.searchTermEmpty) {
            return false;
        }

        symbol = symbol.toLowerCase();
        const searchTerm = this.stateService.normalizedSearchTerm;

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

}
