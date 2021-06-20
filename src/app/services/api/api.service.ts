import { Asset } from "../../models/asset";
import { AssetData } from '../../models/asset-data/asset-data';
import { Observable } from 'rxjs';

export abstract class ApiService {

    abstract fetchAssetDataFor(assets: Asset[]): Observable<AssetData>;

}
