import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//routes
import { PAGES_ROUTES } from "./pages.route";

//modules
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

//components
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConsultarRfcComponent } from './consultar-rfc/consultar-rfc.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';




@NgModule({
  declarations: [
    PagesComponent, 
    LoginComponent, HomeComponent, ConsultarRfcComponent, ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
