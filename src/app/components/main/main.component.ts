import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { CacheService } from '../../services/cache.service';
import { FilterService } from '../../services/filter.service';
import { SettingsService } from '../../services/settings.service';
import { TimespanService } from '../../services/timespan.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public fetchDays: number = 3;
  public symbolInput = '';

  constructor(
    public assetService: AssetService,
    public timespanService: TimespanService,
    public settingsService: SettingsService,
    public cacheService: CacheService,
    public filterService: FilterService
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

    if (this.settingsService.showEstimate1Year) {
      headers.push("1Y Est");
    }

    headers.push(...this.timespanService.activeTimespans.map(t => t.displayText));
    return headers;
  }

  public fetch() {
    this.cacheService.fetchAssetsOlderThanDays(this.fetchDays);
  }

  public addAsset() {
    const newAssetSymbol = this.assetService.addAsset(this.symbolInput);
    if (this.settingsService.fetchOnAdd) {
      this.cacheService.fetchSymbol(newAssetSymbol);
    }
    this.symbolInput = '';
  }

}
