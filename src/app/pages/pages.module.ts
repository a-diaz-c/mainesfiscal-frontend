import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ListaNegraComponent } from './lista-negra/lista-negra.component';
import { LoginComponent } from './login/login.component';

import { PAGES_ROUTES } from "./pages.route";



@NgModule({
  declarations: [
    PagesComponent, 
    ListaNegraComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
