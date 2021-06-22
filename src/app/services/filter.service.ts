import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Asset } from '../models/asset';
import { ToggleActiveSet } from '../models/toggle-active-set';
import { AssetService } from './asset.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private _enabledTags = new ToggleActiveSet<string>();

    private _excludedTags = new ToggleActiveSet<string>();

    private _searchTerm = '';

    public $filterUpdated = new Subject<void>();

    constructor(private assetService: AssetService) {
        this.enableAllTags();
    }

    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(term: string) {
        this._searchTerm = term;
        this.$filterUpdated.next();
    }

    get filteredAssets(): Asset[] {
        if (this._enabledTags.size === this.assetService.allUniqueTags.length &&
            this._enabledTags.size === 0 &&
            this.searchTerm.length === 0
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
                (this.searchTerm.length === 0 || asset.symbol.toLowerCase().includes(searchTerm))
            ) {
                assets.push(asset);
            }
        }
        
        return assets;
    }

    public toggleEnableTag(tag: string): void {
        this._enabledTags.toggleActive(tag);
        this.$filterUpdated.next();
    }

    public isTagEnabled(tag: string): boolean {
        return this._enabledTags.isActive(tag);
    }

    public enableAllTags(): void {
        for (const tag of this.assetService.allUniqueTags) {
            this._enabledTags.setActive(tag, true);
        }
        this.$filterUpdated.next();
    }

    public disableAllTags(): void {
        this._enabledTags.clear();
        this.$filterUpdated.next();
    }

    public disableAllTagsExcept(tag: string): void {
        if (this._enabledTags.size === 1 && this._enabledTags.isActive(tag)) {
            this.enableAllTags();
            return;
        }
        this.disableAllTags();
        this.toggleEnableTag(tag);
    }

    public toggleExcludeTag(tag: string): void {
        this._excludedTags.toggleActive(tag);
        this.$filterUpdated.next();
    }

    public isTagExcluded(tag: string): boolean {
        return this._excludedTags.isActive(tag);
    }
}
