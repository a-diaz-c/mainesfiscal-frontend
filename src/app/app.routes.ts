import { RouterModule, Routes } from "@angular/router";

import { NofoundpageComponent } from "./404/nofoundpage/nofoundpage.component";
import { LoginComponent } from './pages/login/login.component';

const app_routes: Routes = [
    { path: "login", component: LoginComponent},
    { path: "**", component: NofoundpageComponent }
];

export const APP_ROUTES = RouterModule.forRoot(app_routes, { useHash: true });