import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NofoundpageComponent } from './404/nofoundpage/nofoundpage.component';

import { PagesModule } from './pages/pages.module';

import { APP_ROUTES } from "./app.routes";
import { SliderComponent } from './shared/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    NofoundpageComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
