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
import { MetodoWebserviceComponent } from './descargar-xml/metodo-webservice/metodo-webservice.component';
import { DescargarXmlComponent } from './descargar-xml/descargar-xml.component';

@NgModule({
  declarations: [
    PagesComponent, 
    LoginComponent, HomeComponent, ConsultarRfcComponent, DescargarXmlComponent, MetodoWebserviceComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
