import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { CacheService } from '../../services/cache.service';
import { FileService } from '../../services/file.service';
import { FilterService } from '../../services/filter.service';
import { IndicatorService } from '../../services/indicator.service';
import { SettingsService } from '../../services/settings.service';

const { exec } = window.require("child_process");

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public fetchDays = 3;

    constructor(
        public assetService: AssetService,
        public settingsService: SettingsService,
        public cacheService: CacheService,
        public filterService: FilterService,
        public fileService: FileService,
        public indicatorService: IndicatorService,
    ) { }

    ngOnInit(): void {
    }

    get assets(): Asset[] {
        return this.filterService.filteredAssets;
    }

    get headers(): string[] {
        const headers = ['Symbol'];

        if (this.settingsService.showCharts) {
            headers.push('Chart');
        }

        headers.push(...this.indicatorService.activeIndicators.map(t => t.shortDescription));
        return headers;
    }

    public fetch(): void {
        this.cacheService.fetchAssetsOlderThanDays(this.fetchDays);
    }

    public editAssets(): void {
        exec(this.fileService.BASE_PATH + this.assetService.ASSETS_FILE_NAME);
    }

    public refreshAssets(): void {
        this.assetService.loadAssets();
    }

    public clearSearchTerm(): void {
        this.filterService.searchTerm = '';
    }

    public clearIndicators(): void {
        this.indicatorService.clearActiveIndicators();
    }

}
