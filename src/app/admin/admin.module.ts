import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminNavbarComponent} from "./components/admin-navbar/admin-navbar.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AdminNavbarLinkComponent} from "./components/admin-navbar/admin-navbar-link/admin-navbar-link.component";
import AdminModalService from "./admin-modal-service";
import {AdminDeleteModalComponent} from "./components/admin-delete-modal/admin-delete-modal.component";
import {SendButtonComponent} from "../components/buttons/send-button/send-button.component";

@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminNavbarComponent,
        AdminNavbarLinkComponent,
        DashboardComponent,
        AdminDeleteModalComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SendButtonComponent
    ],
    exports: [
        AdminDeleteModalComponent
    ],
    providers: [
        AdminModalService
    ]
})
export class AdminModule { }
