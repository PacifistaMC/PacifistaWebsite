import {AfterViewInit, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PacifistaServerInfoService} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'welcome-section',
    templateUrl: './welcome-accueil-section.component.html',
    styleUrls: ['./welcome-accueil-section.component.scss'],
    standalone: false
})
export class WelcomeAccueilSectionComponent implements AfterViewInit {

  playersAmount: number = 0;

  constructor(private readonly httpClient: HttpClient) {
  }

  ngAfterViewInit(): void {
    new PacifistaServerInfoService(this.httpClient, environment.production).getStatus().subscribe({
      next: value => {
        this.playersAmount = value.onlinePlayers
      }
    })
  }

}
