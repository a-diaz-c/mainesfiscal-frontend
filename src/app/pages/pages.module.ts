import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//routes
import { PAGES_ROUTES } from "./pages.route";

//modules
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

//components
import { PagesComponent } from './pages.component';
import { ListaNegraComponent } from './lista-negra/lista-negra.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    PagesComponent, 
    ListaNegraComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
