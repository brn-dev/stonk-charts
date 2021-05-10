import { Injectable } from '@angular/core';
import { AssetSymbol } from '../models/asset-symbol';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  private readonly SYMBOLS_FILE_NAME = '_symbols.json';

  private _symbols: AssetSymbol[] = [];

  constructor(private fileService: FileService) {
    this.loadSymbols();
  }

  get symbols() {
    return this._symbols;
  }

  public addSymbol(assetSymbol: AssetSymbol | string): AssetSymbol {
    let newSymbol: AssetSymbol;

    if (this.isAssetSymbol(assetSymbol)) {
      newSymbol = assetSymbol;
    } else {
      newSymbol = {
        symbol: assetSymbol,
        tags: []
      }
    }

    this._symbols.push(newSymbol);
    this.saveSymbols();
    return newSymbol;
  }

  public removeSymbol(symbol: AssetSymbol) {
    const idx = this.getPositionIndex(symbol);
    if (idx >= 0) {
      this._symbols.splice(idx, 1);
    }
    this.saveSymbols();
  }

  public getPositionIndex(symbol: AssetSymbol) {
    return this._symbols.indexOf(symbol);
  }

  public changePosition(symbol: AssetSymbol, index: number) {
    const currentIndex = this.getPositionIndex(symbol);
    this._symbols.splice(currentIndex, 1);
    this._symbols.splice(index, 0, symbol);
    this.saveSymbols();
  }

  public getAllUniqueTags(): string[] {
    const tagsWithCount = new Map<string, number>();
    for (const symbol of this.symbols) {
      for (const tag of symbol.tags) {
        if (tagsWithCount.has(tag)) {
          tagsWithCount.set(tag, tagsWithCount.get(tag) + 1);
        } else {
          tagsWithCount.set(tag, 1);
        }
      }
    }
    
    const arr = Array.from(tagsWithCount);

    arr.sort((a, b) => {
      const countA = a[1];
      const countB = b[1];

      if (countA > countB) {
        return -1;
      }
      return countB > countA ? 1 : 0;
    });
    

    return arr.map(elem => elem[0]);
  }
  
  private saveSymbols(): void {
    this.fileService.writeJsonToFile(this.SYMBOLS_FILE_NAME, this._symbols);
  }

  private loadSymbols(): void {
    const result = this.fileService.readJsonFromFile<AssetSymbol[]>(this.SYMBOLS_FILE_NAME);
    this._symbols = result !== null ? result : [];
  }

  private isAssetSymbol(obj: any): obj is AssetSymbol {
    return 'symbol' in obj && 'tags' in obj;
  }

}
