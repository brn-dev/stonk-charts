import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { ApiService } from './api/api.service';
import { FileService } from './file.service';
import { SymbolService } from './symbol.service';
import * as moment from 'moment';
import { ChartHelper } from '../models/chart-helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private readonly STAGGER_MILLIS = 500;

  private symbolChartCache = new Map<string, Chart>();

  public $symbolUpdated = new Subject<string>();

  constructor(
    private fileService: FileService, 
    private symbolService: SymbolService,
    private apiService: ApiService,
  ) {
    this.loadForAllSymbols();
    // this.fetchSymbols(symbolService.symbols);
  }

  public setForSymbol(symbol: string, chart: Chart) {
    this.symbolChartCache.set(symbol, chart);
    this.saveForSymbol(symbol, chart);
    this.$symbolUpdated.next(symbol);
  }

  public getForSymbol(symbol: string) {
    return this.symbolChartCache.get(symbol);
  }

  public async fetchSymbol(symbol: string) {
    await this.fetchSymbols([symbol]);
  }

  public async fetchSymbols(symbols: string[]) {
    const symbolsToFetchCount = symbols.length;
    let finishedFetchingCounter = 0;

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      setTimeout(async () => {
        console.log(`fetching ${symbol}`);

        const chart = await this.apiService.fetchChartFor(symbol);
        this.setForSymbol(symbol, chart);

        console.log(`finished fetching ${symbol}`);

        finishedFetchingCounter++
        if (finishedFetchingCounter === symbolsToFetchCount) {
          console.log('fetch finished');
        }
      }, this.STAGGER_MILLIS * i);
    }
  }

  public fetchSymbolsOlderThanDays(days: number) {
    const symbolsToFetch: string[] = [];
    const past = moment().subtract(days, 'd');

    for (const symbol of this.symbolService.symbols) {
      if (!this.symbolChartCache.has(symbol) || this.symbolChartCache.get(symbol) === null) {
        symbolsToFetch.push(symbol);
        continue;
      }

      const chart = this.symbolChartCache.get(symbol);
      const latestEntry = ChartHelper.latestChartEntry(chart);
      const mom = moment(latestEntry.timestamp * 1000);

      if (mom.isSameOrBefore(past, 'd')) {
        symbolsToFetch.push(symbol);
      }
    }    

    this.fetchSymbols(symbolsToFetch);
  }

  private saveForSymbol(symbol: string, chart: Chart) {
    const fileName = this.getFileNameForSymbol(symbol);
    this.fileService.writeJsonToFile(fileName, chart);
  }

  private loadForSymbol(symbol: string) {
    const fileName = this.getFileNameForSymbol(symbol);
    if (this.fileService.doesExist(fileName)) {
      this.symbolChartCache.set(
        symbol,
        this.fileService.readJsonFromFile<Chart>(fileName)
      );
    } else {
      this.symbolChartCache.set(symbol, null);
    }
  }

  private loadForAllSymbols() {
    for (const symbol of this.symbolService.symbols) {
      this.loadForSymbol(symbol);
    }
  }

  private getFileNameForSymbol(symbol: string) {
    return `${symbol}.json`;
  }
}