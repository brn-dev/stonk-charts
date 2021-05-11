import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { AssetService } from './asset.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private enabledTags = new Set<string>();

  constructor(private assetService: AssetService) {
    this.enableAll();
  }

  get filteredAssets(): Asset[] {
    if (this.enabledTags.size === this.assetService.getAllUniqueTags().length) {
      return this.assetService.assets;
    }
    if (this.enabledTags.size === 0) {
      return [];
    }

    const assets: Asset[] = [];
    for (const asset of this.assetService.assets) {
      if (asset.tags.some(tag => this.enabledTags.has(tag))) {
        assets.push(asset);
      }
    }
    return assets;
  }

  public toggle(tag: string): boolean {
    if (this.enabledTags.has(tag)) {
      this.enabledTags.delete(tag);
      return false;
    } else {
      this.enabledTags.add(tag);
      return true;
    }
  }

  public isEnabled(tag: string) {
    return this.enabledTags.has(tag);
  }

  public enableAll() {
    for (const tag of this.assetService.getAllUniqueTags()) {
      this.enabledTags.add(tag);
    }
  }

  public enableNone() {
    this.enabledTags.clear();
  }
}
