import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {VoteComponent} from "./vote.component";
import {VoteRoutingModule} from "./vote-routing.module";
import {VoteUserComponent} from "./components/vote-user/vote-user.component";
import {VoteTopClassementComponent} from "./components/vote-top-classement/vote-top-classement.component";
import {
    VoteClassementRowComponent
} from "./components/vote-top-classement/vote-classement-row/vote-classement-row.component";


@NgModule({
    declarations: [
        VoteComponent,
        VoteUserComponent,
        VoteTopClassementComponent,
        VoteClassementRowComponent
    ],
    imports: [
        CommonModule,
        VoteRoutingModule,
        NgOptimizedImage
    ]
})
export class VoteModule { }
