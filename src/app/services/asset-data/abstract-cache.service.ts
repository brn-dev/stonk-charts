import { Subject } from 'rxjs';
import { Asset } from '../../models/asset';
import { FileService } from '../file.service';
import { AssetService } from '../asset/asset.service';

export abstract class AbstractCacheService<T> {

    public readonly $assetUpdated = new Subject<Asset>();

    protected readonly cache = new Map<string, T>();

    protected constructor(
        private readonly fileService: FileService,
        private readonly assetService: AssetService,
        private readonly basePath: string,
    ) {
        this.loadForAllAssets();
    }

    public abstract fetchAssets(assets: Asset[]): void;

    public setForAsset(asset: Asset, data: T): void {
        this.cache.set(asset.symbol, data);
        this.saveForAsset(asset, data);
        this.$assetUpdated.next(asset);
    }

    public getForAsset(asset: Asset): T {
        return this.cache.get(asset.symbol) ?? null;
    }

    public fetchAsset(asset: Asset): void {
        this.fetchAssets([asset]);
    }

    private saveForAsset(asset: Asset, data: T) {
        const fileName = this.getFileNameForAsset(asset);
        this.fileService.writeJsonToFile(fileName, data);
    }

    private loadForAsset(asset: Asset) {
        const fileName = this.getFileNameForAsset(asset);
        if (this.fileService.doesExist(fileName)) {
            this.cache.set(
                asset.symbol,
                this.fileService.readJsonFromFile<T>(fileName)
            );
        } else {
            this.cache.set(asset.symbol, null);
        }
    }

    private loadForAllAssets() {
        for (const asset of this.assetService.assets) {
            this.loadForAsset(asset);
        }
    }

    private getFileNameForAsset(asset: Asset) {
        return `${this.basePath}${asset.symbol}.json`;
    }
}