import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { YahooApiService } from './services/api/yahoo-api.service';
import { ApiService } from './services/api/api.service';
import { SymbolComponent } from './components/symbol/symbol.component';
import { DeltaComponent } from './components/delta/delta.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  declarations: [AppComponent, MainComponent, SymbolComponent, DeltaComponent, TagComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [
    { provide: ApiService, useClass: YahooApiService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
