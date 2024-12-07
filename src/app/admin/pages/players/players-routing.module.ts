import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PlayersComponent} from "./players.component";
import {PlayersSanctionsComponent} from "./players-sanctions/players-sanctions.component";
import {PlayersMoneyComponent} from "./players-money/players-money.component";

const routes: Routes = [
    {
        path: '',
        component: PlayersComponent
    },
    {
        path: 'sanctions',
        component: PlayersSanctionsComponent
    },
    {
        path: 'money',
        component: PlayersMoneyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayersRoutingModule { }