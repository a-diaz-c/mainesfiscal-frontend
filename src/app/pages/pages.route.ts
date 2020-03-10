import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { ConsultarRfcComponent } from './consultar-rfc/consultar-rfc.component';
import { DescargarXmlComponent } from './descargar-xml/descargar-xml.component';
import { MetodoWebserviceComponent } from './descargar-xml/metodo-webservice/metodo-webservice.component';


const pagesRoutes: Routes = [
   { 
       path: "",
        component: PagesComponent,
        children: [
            { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
            { path: "consultar-rfc", component: ConsultarRfcComponent },
            { path: "descargar-xml", component: DescargarXmlComponent, 
                children: [
                    { path: "metodo-webservice", component: MetodoWebserviceComponent}
                ]},
            { path: "", redirectTo: "/consultar-rfc", pathMatch: "full" }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);