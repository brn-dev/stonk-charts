import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private readonly SYMBOLS_FILE_NAME = '_assets.json';

  private _assets: Asset[] = [];

  constructor(private fileService: FileService) {
    this.loadAssets();
  }

  get assets() {
    return this._assets;
  }

  public addAsset(asset: Asset | string): Asset {
    let newAsset: Asset;

    if (this.isAsset(asset)) {
      newAsset = asset;
    } else {
      newAsset = {
        symbol: asset,
        tags: []
      }
    }

    this._assets.push(newAsset);
    this.saveAssets();
    return newAsset;
  }

  public removeSymbol(asset: Asset) {
    const idx = this.getPositionIndex(asset);
    if (idx >= 0) {
      this._assets.splice(idx, 1);
    }
    this.saveAssets();
  }

  public getPositionIndex(asset: Asset) {
    return this._assets.indexOf(asset);
  }

  public changePosition(asset: Asset, index: number) {
    const currentIndex = this.getPositionIndex(asset);
    this._assets.splice(currentIndex, 1);
    this._assets.splice(index, 0, asset);
    this.saveAssets();
  }

  public getAllUniqueTags(): string[] {
    const tagsWithCount = new Map<string, number>();
    for (const asset of this.assets) {
      for (const tag of asset.tags) {
        if (tagsWithCount.has(tag)) {
          tagsWithCount.set(tag, tagsWithCount.get(tag) + 1);
        } else {
          tagsWithCount.set(tag, 1);
        }
      }
    }
    
    const arr = Array.from(tagsWithCount);

    arr.sort((a, b) => {
      const countA = a[1];
      const countB = b[1];

      if (countA > countB) {
        return -1;
      }
      return countB > countA ? 1 : 0;
    });
    

    return arr.map(elem => elem[0]);
  }
  
  private saveAssets(): void {
    this.fileService.writeJsonToFile(this.SYMBOLS_FILE_NAME, this._assets);
  }

  private loadAssets(): void {
    const result = this.fileService.readJsonFromFile<Asset[]>(this.SYMBOLS_FILE_NAME);
    this._assets = result !== null ? result : [];
  }

  private isAsset(obj: any): obj is Asset {
    return 'symbol' in obj && 'tags' in obj;
  }

}
