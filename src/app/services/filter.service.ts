import { Injectable } from '@angular/core';
import { AssetSymbol } from '../models/asset-symbol';
import { SymbolService } from './symbol.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private enabledTags = new Set<string>();

  constructor(private symbolService: SymbolService) {
    this.enableAll();
  }

  get filteredSymbols(): AssetSymbol[] {
    if (this.enabledTags.size === this.symbolService.getAllUniqueTags().length) {
      return this.symbolService.symbols;
    }
    if (this.enabledTags.size === 0) {
      return [];
    }

    const symbols: AssetSymbol[] = [];
    for (const symbol of this.symbolService.symbols) {
      if (symbol.tags.some(tag => this.enabledTags.has(tag))) {
        symbols.push(symbol);
      }
    }
    return symbols;
  }

  public toggle(tag: string): boolean {
    if (this.enabledTags.has(tag)) {
      this.enabledTags.delete(tag);
      return false;
    } else {
      this.enabledTags.add(tag);
      return true;
    }
  }

  public isEnabled(tag: string) {
    return this.enabledTags.has(tag);
  }

  public enableAll() {
    for (const tag of this.symbolService.getAllUniqueTags()) {
      this.enabledTags.add(tag);
    }
  }

  public enableNone() {
    this.enabledTags.clear();
  }
}
