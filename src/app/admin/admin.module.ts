import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminNavbarComponent} from "./components/admin-navbar/admin-navbar.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AdminNavbarLinkComponent} from "./components/admin-navbar/admin-navbar-link/admin-navbar-link.component";
import AdminModalService from "./admin-modal-service";

@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminNavbarComponent,
        AdminNavbarLinkComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    providers: [
        AdminModalService
    ]
})
export class AdminModule { }
