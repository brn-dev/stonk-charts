import { Injectable } from '@angular/core';
import { Estimation } from '../../models/asset-data/estimation';
import { FileService } from '../file.service';
import { Asset } from '../../models/asset';
import { RawEstimation } from '../../models/asset-data/raw-estimation';

// noinspection JSUnfilteredForInLoop
@Injectable({
    providedIn: 'root'
})
export class EstimationService {

    public readonly ESTIMATIONS_FILE_NAME = 'estimations.json';

    private _estimations = new Map<string, Estimation>();

    constructor(private fileService: FileService) {
        this.loadEstimations();
    }

    public loadEstimations(): void {
        const rawEstimations = this.fileService.readJsonFromFile<RawEstimation[]>(this.ESTIMATIONS_FILE_NAME);


        const estimations = rawEstimations.map(re => this.mapRawEstimation(re));

        for (const estimation of estimations) {
            this._estimations.set(estimation.symbol, estimation);
        }
    }

    public hasEstimation(asset: Asset): boolean {
        return this._estimations.has(asset.symbol);
    }

    public getEstimation(asset: Asset): Estimation {
        return this._estimations.get(asset.symbol);
    }

    private mapRawEstimation(rawEstimation: RawEstimation): Estimation {
        let targets = new Array<number>();

        for (const targetProvider in rawEstimation.targets) {
            targets.push(rawEstimation.targets[targetProvider]);
        }

        targets = targets.filter(t => !!t);

        if (targets.length === 0) {
            return {
                symbol: rawEstimation.symbol,
                targets: [],
                averageTarget: null,
                lowTarget: null,
                highTarget: null,
                averageDeviation: null
            };
        }

        let count = 0;
        let sum = 0;
        let lowTarget = Number.MAX_SAFE_INTEGER;
        let highTarget = Number.MIN_SAFE_INTEGER;

        for (const target of targets) {
            count++;
            sum += target;

            if (target > highTarget) {
                highTarget = target;
            }
            if (target < lowTarget) {
                lowTarget = target;
            }
        }

        const averageTarget = sum / count;

        let deviationSum = 0;

        for (const target of targets) {
            deviationSum += Math.abs(target - averageTarget) / averageTarget;
        }

        const averageDeviation = deviationSum / count;

        return {
            symbol: rawEstimation.symbol,
            targets,
            averageTarget,
            lowTarget,
            highTarget,
            averageDeviation
        };
    }
}
