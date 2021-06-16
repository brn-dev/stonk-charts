export interface Asset {
    symbol: string;
    tags: string[];
    oneYearEstimation?: number;
    description?: string;
    unavailable?: boolean;
}

export class Asset {
    public static isAsset(obj: any): obj is Asset {
        return 'symbol' in obj && 'tags' in obj;
    }
}
