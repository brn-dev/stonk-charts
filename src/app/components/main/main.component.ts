import { Component, OnInit } from '@angular/core';
import { AssetSymbol } from '../../models/asset-symbol';
import { CacheService } from '../../services/cache.service';
import { FilterService } from '../../services/filter.service';
import { SettingsService } from '../../services/settings.service';
import { SymbolService } from '../../services/symbol.service';
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
    public symbolService: SymbolService,
    public timespanService: TimespanService,
    public settingsService: SettingsService,
    public cacheService: CacheService,
    public filterService: FilterService
  ) { }

  ngOnInit(): void {
  }
  
  get symbols(): AssetSymbol[] {
    return this.filterService.filteredSymbols;
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
    this.cacheService.fetchSymbolsOlderThanDays(this.fetchDays);
  }

  public addSymbol() {
    const newSymbol = this.symbolService.addSymbol(this.symbolInput);
    if (this.settingsService.fetchOnAdd) {
      this.cacheService.fetchSymbol(newSymbol);
    }
    this.symbolInput = '';
  }

}
