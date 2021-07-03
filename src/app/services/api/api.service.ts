import { Asset } from "../../models/asset";
import { BasicAssetData } from '../../models/asset-data/basic-asset-data';
import { Observable } from 'rxjs';

export abstract class ApiService {

    abstract fetchAssetDataFor(assets: Asset[]): Observable<BasicAssetData>;

}
