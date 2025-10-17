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

@NgModule({
  declarations: [
    WorldDlComponent,
    WorldDlLogsComponent
  ],
  imports: [
    CommonModule,
    WorldDlRoutingModule
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
