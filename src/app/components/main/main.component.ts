import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { AssetDataCacheService } from '../../services/asset-data-cache.service';
import { FileService } from '../../services/file.service';
import { FilterService } from '../../services/filter.service';
import { IndicatorService } from '../../services/indicator.service';
import { SettingsService } from '../../services/settings.service';
import { SortService } from '../../services/sort.service';
import { Indicator } from '../../models/indicators/indicator';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FilterStateService } from '../../services/filter-state.service';

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
        public assetDataCacheService: AssetDataCacheService,
        public filterStateService: FilterStateService,
        public fileService: FileService,
        public indicatorService: IndicatorService,
        public sortService: SortService,
    ) { }

    ngOnInit(): void {
    }

    get assets(): Asset[] {
        return this.sortService.sortedAssets;
    }

    public fetch(): void {
        this.assetDataCacheService.fetchAssetsOlderThanDays(this.fetchDays);
    }

    public editAssets(): void {
        exec(this.fileService.BASE_PATH + this.assetService.ASSETS_FILE_NAME);
    }

    public refreshAssets(): void {
        this.assetService.loadAssets();
    }

    public clearSearchTerm(): void {
        this.filterStateService.searchTerm = '';
    }

    public clearIndicators(): void {
        this.indicatorService.clearActiveIndicators();
    }

    public onIndicatorHeaderClick(indicator: Indicator<any>): void {
        this.sortService.setOrToggleSortIndicator(indicator);
    }

    public headerDropped(evt: CdkDragDrop<Indicator<any>[]>): void {
        moveItemInArray(evt.container.data, evt.previousIndex, evt.currentIndex);
    }

}
