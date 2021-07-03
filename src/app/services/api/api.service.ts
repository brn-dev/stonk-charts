import { Asset } from "../../models/asset";
import { BasicAssetData } from '../../models/asset-data/basic-asset-data';
import { Observable } from 'rxjs';
import { AssetFinancials } from '../../models/asset-data/asset-financials';

export abstract class ApiService {

    abstract fetchAssetDataFor(assets: Asset[]): Observable<BasicAssetData>;
    
    abstract fetchFinancialsFor(assets: Asset[]): Observable<[Asset, AssetFinancials]>;

}
