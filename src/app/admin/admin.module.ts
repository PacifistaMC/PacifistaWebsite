import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

@NgModule({
    declarations: [
        AdminDashboardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
