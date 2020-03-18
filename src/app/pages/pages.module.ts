import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//routes
import { PAGES_ROUTES } from "./pages.route";

//modules
import { SharedModule } from "../shared/shared.module";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

//components
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConsultarRfcComponent } from './consultar-rfc/consultar-rfc.component';
import { MetodoWebserviceComponent } from './descargar-xml/metodo-webservice/metodo-webservice.component';
import { DescargarXmlComponent } from './descargar-xml/descargar-xml.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MetodosDescargaComponent } from './descargar-xml/metodos-descarga/metodos-descarga.component';
import { AltaEmpresaComponent } from './alta-empresa/alta-empresa.component';
import { AltaRFCComponent } from './alta-rfc/alta-rfc.component';

@NgModule({
  declarations: [
    PagesComponent, 
    LoginComponent, 
    HomeComponent, 
    ConsultarRfcComponent, 
    DescargarXmlComponent, 
    MetodoWebserviceComponent,
    ConfiguracionComponent,
    MetodosDescargaComponent,
    AltaEmpresaComponent,
    AltaRFCComponent,
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
