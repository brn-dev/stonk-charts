import { Injectable } from '@angular/core';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  private readonly SYMBOLS_FILE_NAME = '_symbols.json';

  private _symbols: string[] = [];

  constructor(private fileService: FileService) {
    this.loadSymbols();
  }

  get symbols() {
    return this._symbols;
  }

  public addSymbol(symbol: string) {
    this._symbols.push(symbol);
    this.saveSymbols();
  }

  public removeSymbol(symbol: string) {
    const idx = this.getPositionIndex(symbol);
    if (idx >= 0) {
      this._symbols.splice(idx, 1);
    }
    this.saveSymbols();
  }

  public getPositionIndex(symbol: string) {
    return this._symbols.indexOf(symbol);
  }

  public changePosition(symbol: string, index: number) {
    const currentIndex = this.getPositionIndex(symbol);
    this._symbols.splice(currentIndex, 1);
    this._symbols.splice(index, 0, symbol);
    this.saveSymbols();
  }
  
  private saveSymbols(): void {
    this.fileService.writeJsonToFile(this.SYMBOLS_FILE_NAME, this._symbols);
  }

  private loadSymbols(): void {
    const result = this.fileService.readJsonFromFile<string[]>(this.SYMBOLS_FILE_NAME);
    this._symbols = result !== null ? result : [];
  }

}
