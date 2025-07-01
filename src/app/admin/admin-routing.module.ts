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
            },
            {
                path: 'news',
                loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
            },
            {
                path: 'shop',
                loadChildren: () => import('./pages/shop/shop-admin.module').then(m => m.ShopAdminModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
