import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PacifistaServerInfoService} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../environments/environment";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'welcome-section',
    templateUrl: './welcome-accueil-section.component.html',
    styleUrls: ['./welcome-accueil-section.component.scss'],
    standalone: false
})
export class WelcomeAccueilSectionComponent implements OnInit {

    private readonly infoService: PacifistaServerInfoService;

    protected playersAmount: number = 0;

    constructor(
        httpClient: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.infoService = new PacifistaServerInfoService(httpClient, environment.production);
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.infoService.getStatus().subscribe(serverData => {
                this.playersAmount = serverData.onlinePlayers;
            });
        }
    }

}
