import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayersComponent} from "./players.component";
import {HttpClientModule} from "@angular/common/http";
import {PlayersRoutingModule} from "./players-routing.module";
import {PlayersSanctionsComponent} from "./players-sanctions/players-sanctions.component";
import {PlayersMoneyComponent} from "./players-money/players-money.component";

@NgModule({
    declarations: [
        PlayersComponent,
        PlayersSanctionsComponent,
        PlayersMoneyComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        PlayersRoutingModule
    ]
})
export class PlayersModule { }
