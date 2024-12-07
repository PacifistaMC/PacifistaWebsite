import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayersComponent} from "./players.component";
import {PlayersRoutingModule} from "./players-routing.module";
import {PlayersSanctionsComponent} from "./players-sanctions/players-sanctions.component";
import {PlayersMoneyComponent} from "./players-money/players-money.component";
import {MinecraftHeadComponent} from "../../../components/minecraft-head/minecraft-head.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {NgbdSearchableHeader, NgbdSortableHeader} from "../../../components/paginated/paginated.component";

@NgModule({
    declarations: [
        PlayersComponent,
        PlayersSanctionsComponent,
        PlayersMoneyComponent
    ],
    imports: [
        CommonModule,
        PlayersRoutingModule,
        MinecraftHeadComponent,
        NgbPagination,
        NgbdSortableHeader,
        NgbdSearchableHeader
    ]
})
export class PlayersModule { }
