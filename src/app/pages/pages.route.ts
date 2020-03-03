import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { ConsultarRfcComponent } from './consultar-rfc/consultar-rfc.component';


const pagesRoutes: Routes = [
   { 
       path: "",
        component: PagesComponent,
        children: [
            { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
            { path: "consultar-rfc", component: ConsultarRfcComponent},
            { path: "", redirectTo: "/consultar-rfc", pathMatch: "full" }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);