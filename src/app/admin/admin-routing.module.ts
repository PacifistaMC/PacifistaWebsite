import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: AdminDashboardComponent, children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'players',
                loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule)
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
