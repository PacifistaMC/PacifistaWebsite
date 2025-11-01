import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorldDlComponent} from "./world-dl-component/world-dl.component";
import {WorldDlRoutingModule} from "./world-dl-routing.module";
import {WorldDlLogsComponent} from "./world-dl-logs/world-dl-logs.component";
import ClaimService from "./api/services/claim.service";
import HomeService from "./api/services/home.service";
import WorldDlLogsService from "./world-dl-logs/world-dl-logs.service";
import {WorldDlService} from "./world-dl.service";
import McaService from "./services/mca.service";
import {ResumeCoordinatesFilesService} from "./services/resume-coordinates-files.service";
import {
  PacifistaSearchPlayerInputComponent
} from "../../components/inputs/pacifista-search-player-input/pacifista-search-player-input.component";
import {MinecraftHeadComponent} from "../../components/minecraft-head/minecraft-head.component";
import {SendButtonComponent} from "../../components/buttons/send-button/send-button.component";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {WorldDlFunixLinksComponent} from "./world-dl-funix-links/world-dl-funix-links.component";

@NgModule({
    declarations: [
        WorldDlComponent,
        WorldDlLogsComponent,
        WorldDlFunixLinksComponent
    ],
    imports: [
        CommonModule,
        WorldDlRoutingModule,
        PacifistaSearchPlayerInputComponent,
        MinecraftHeadComponent,
        SendButtonComponent,
        SpinnerComponent
    ],
    exports: [
        WorldDlFunixLinksComponent
    ],
    providers: [
        WorldDlService,
        ClaimService,
        HomeService,
        WorldDlLogsService,
        McaService,
        ResumeCoordinatesFilesService
    ]
})
export class WorldDlModule { }
