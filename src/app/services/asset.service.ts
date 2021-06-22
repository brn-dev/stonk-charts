import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';
import { FileService } from './file.service';

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    public readonly ASSETS_FILE_NAME = 'assets.json';

    private _assets: Asset[] = [];
    private _allUniqueTags: string[] = [];

    constructor(private fileService: FileService) {
        this.loadAssets();
    }

    get assets(): Asset[] {
        return this._assets;
    }

    get allUniqueTags(): string[] {
        return this._allUniqueTags;
    }

    public loadAssets(): void {
        const result = this.fileService.readJsonFromFile<Asset[]>(this.ASSETS_FILE_NAME);
        this._assets = result !== null ? result : [];
        this.calculateUniqueTags();
    }

    private calculateUniqueTags(): void {
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


        this._allUniqueTags = arr.map(elem => elem[0]);
    }

}
