import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { NofoundpageComponent } from './404/nofoundpage/nofoundpage.component';

import { PagesModule } from './pages/pages.module';

import { APP_ROUTES } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    NofoundpageComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
