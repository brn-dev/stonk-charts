import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { CacheService } from '../../services/cache.service';
import { FileService } from '../../services/file.service';
import { FilterService } from '../../services/filter.service';
import { SettingsService } from '../../services/settings.service';
import { TimespanService } from '../../services/timespan.service';

const { exec } = window.require("child_process");

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public fetchDays: number = 3;

    constructor(
        public assetService: AssetService,
        public timespanService: TimespanService,
        public settingsService: SettingsService,
        public cacheService: CacheService,
        public filterService: FilterService,
        public fileService: FileService
    ) { }

    ngOnInit(): void {
    }

    get assets(): Asset[] {
        return this.filterService.filteredAssets;
    }

    get headers(): string[] {
        const headers = ['Symbol'];

        if (this.settingsService.showCharts) {
            headers.push('Chart')
        }

        if (this.settingsService.showOneYearEstimation) {
            headers.push("1Y Est");
        }

        headers.push(...this.timespanService.activeTimespans.map(t => t.displayText));
        return headers;
    }

    public fetch() {
        this.cacheService.fetchAssetsOlderThanDays(this.fetchDays);
    }

    public editAssets() {
        exec(this.fileService.BASE_PATH + this.assetService.ASSET_FILE_NAME);
    }

    public refreshAssets() {
        this.assetService.loadAssets();
    }

}
