import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../services/cache.service';
import { SettingsService } from '../../services/options.service';
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
    public cacheService: CacheService
  ) { }

  ngOnInit(): void {
  }
  
  get symbols(): string[] {
    return this.symbolService.symbols;
  }

  get headers(): string[] {
    const headers = ['Symbol'];

    if (this.settingsService.showCharts) {
      headers.push('Chart')
    }

    headers.push(...this.timespanService.activeTimespans.map(t => t.displayText));
    return headers;
  }

  public fetch() {
    this.cacheService.fetchSymbolsOlderThanDays(this.fetchDays);
  }

  public addSymbol() {
    this.symbolService.addSymbol(this.symbolInput);
    if (this.settingsService.fetchOnAdd) {
      this.cacheService.fetchSymbol(this.symbolInput);
    }
    this.symbolInput = '';
  }

}
