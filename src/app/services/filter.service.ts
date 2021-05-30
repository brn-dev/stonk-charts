import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { ToggleActiveSet } from '../models/toggle-active-set';
import { AssetService } from './asset.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private _enabledTags = new ToggleActiveSet<string>();

    private _excludedTags = new ToggleActiveSet<string>();

    public searchTerm = '';

    constructor(private assetService: AssetService) {
        this.enableAllTags();
    }

    get filteredAssets(): Asset[] {
        if (this._enabledTags.size === this.assetService.getAllUniqueTags().length &&
            this._enabledTags.size === 0 &&
            this.searchTerm.length < 2
        ) {
            return this.assetService.assets;
        }
        if (this._enabledTags.size === 0) {
            return [];
        }
        
        const searchTerm = this.searchTerm.toLowerCase();
        const assets: Asset[] = [];
        for (const asset of this.assetService.assets) {
            if (asset.tags.some(tag => this._enabledTags.isActive(tag)) &&
                !asset.tags.some(tag => this._excludedTags.isActive(tag)) &&
                (this.searchTerm.length < 2 || asset.symbol.toLowerCase().includes(searchTerm))
            ) {
                assets.push(asset);
            }
        }
        
        return assets;
    }

    public toggleEnableTag(tag: string): void {
        this._enabledTags.toggleActive(tag);
    }

    public isTagEnabled(tag: string) {
        return this._enabledTags.isActive(tag);
    }

    public enableAllTags() {
        for (const tag of this.assetService.getAllUniqueTags()) {
            this._enabledTags.setActive(tag, true);
        }
    }

    public disableAllTags() {
        this._enabledTags.clear();
    }

    public disableAllTagsExcept(tag: string) {
        if (this._enabledTags.size === 1 && this._enabledTags.isActive(tag)) {
            this.enableAllTags();
            return;
        }
        this.disableAllTags();
        this.toggleEnableTag(tag);
    }

    public toggleExcludeTag(tag: string): void {
        this._excludedTags.toggleActive(tag);
    }

    public isTagExcluded(tag: string): boolean {
        return this._excludedTags.isActive(tag);
    }
}
