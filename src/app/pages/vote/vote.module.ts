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
import {MinecraftHeadComponent} from "../../components/minecraft-head/minecraft-head.component";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha-2";
import {environment} from "../../../environments/environment";

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
        RecaptchaV3Module,
        NgOptimizedImage,
        PacifistaSearchPlayerInputComponent,
        MinecraftHeadComponent,
        SpinnerComponent
    ],
    providers: [
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.reCaptchaSiteKey,
        },
    ]
})
export class VoteModule { }
