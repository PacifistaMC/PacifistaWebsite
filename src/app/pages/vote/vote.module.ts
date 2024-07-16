import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {VoteComponent} from "./vote.component";
import {VoteRoutingModule} from "./vote-routing.module";
import {VoteUserComponent} from "./components/vote-user/vote-user.component";
import {VoteTopClassementComponent} from "./components/vote-top-classement/vote-top-classement.component";
import {
    VoteClassementRowComponent
} from "./components/vote-top-classement/vote-classement-row/vote-classement-row.component";
import {
    PacifistaSearchPlayerInputComponent
} from "../../components/inputs/pacifista-search-player-input/pacifista-search-player-input.component";
import {VoteUserWebsiteComponent} from "./components/vote-user/vote-user-website/vote-user-website.component";


@NgModule({
    declarations: [
        VoteComponent,
        VoteUserComponent,
        VoteTopClassementComponent,
        VoteClassementRowComponent,
        VoteUserWebsiteComponent
    ],
    imports: [
        CommonModule,
        VoteRoutingModule,
        NgOptimizedImage,
        PacifistaSearchPlayerInputComponent
    ]
})
export class VoteModule { }
