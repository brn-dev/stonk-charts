import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { YahooApiService } from './services/api/yahoo-api.service';
import { ApiService } from './services/api/api.service';
import { AssetComponent } from './components/asset/asset.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TagComponent } from './components/tag/tag.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AssetComponent,
        TagComponent,
        IndicatorComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        HighchartsChartModule,
        DragDropModule,
    ],
    providers: [
        { provide: ApiService, useClass: YahooApiService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
