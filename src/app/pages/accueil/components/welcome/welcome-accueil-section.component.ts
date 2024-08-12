import {AfterViewInit, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PacifistaServerInfoService} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'welcome-section',
  templateUrl: './welcome-accueil-section.component.html',
  styleUrls: ['./welcome-accueil-section.component.scss']
})
export class WelcomeAccueilSectionComponent implements AfterViewInit {

  private readonly statusService: PacifistaServerInfoService
  playersAmount: number = 0;

  constructor(httpClient: HttpClient) {
    this.statusService = new PacifistaServerInfoService(httpClient, environment.production)
  }

  ngAfterViewInit(): void {
    this.statusService.getStatus().subscribe({
      next: value => {
        this.playersAmount = value.onlinePlayers
      }
    })
  }

}
