import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminNavbarComponent} from "./components/admin-navbar/admin-navbar.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AdminNavbarLinkComponent} from "./components/admin-navbar/admin-navbar-link/admin-navbar-link.component";

@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminNavbarComponent,
        AdminNavbarLinkComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
