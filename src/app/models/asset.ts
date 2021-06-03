export interface Asset {
    symbol: string;
    tags: string[];
    oneYearEstimation?: number;
    description?: string;
    unavailable?: boolean;
}
