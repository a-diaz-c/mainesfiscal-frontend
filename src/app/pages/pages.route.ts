import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { ListaNegraComponent } from './lista-negra/lista-negra.component';
import { LoginComponent } from './login/login.component';


const pagesRoutes: Routes = [
   { 
       path: "",
        component: PagesComponent,
        children: [
            { path: "login", component: LoginComponent},
            { path: "lista-negra", component: ListaNegraComponent},
            { path: "", redirectTo: "/lista-negra", pathMatch: "full" }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);