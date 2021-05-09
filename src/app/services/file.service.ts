import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly fs = window.require('fs');
  private readonly homedir = window.require('os').homedir();

  public readonly BASE_PATH = this.homedir + "/stonk-charts/";

  constructor() {
    console.log(this.homedir);

    this.makeSureBasePathExists();
  }

  public writeJsonToFile<T>(fileName: string, data: T): void {
    this.fs.writeFileSync(this.BASE_PATH + fileName, JSON.stringify(data), 'utf-8');
  }

  public readJsonFromFile<T>(fileName: string): T {
    return JSON.parse(this.fs.readFileSync(this.BASE_PATH + fileName, { encoding: 'utf-8' }));
  }

  public doesExist(fileName: string): boolean {
    return this.fs.existsSync(this.BASE_PATH + fileName);
  }

  private makeSureBasePathExists() {
    console.log(this.fs);

    if (!this.fs.existsSync(this.BASE_PATH)) {
      this.fs.mkdirSync(this.BASE_PATH);
    }
  }

}
