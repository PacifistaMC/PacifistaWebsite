import {AfterViewInit, Component} from '@angular/core';
import {
    ErrorDto,
    PacifistaWebUserLinkDTO,
    PacifistaWebUserLinkService,
    UserAuthService,
    VoteService,
    VoteWebsiteDTO
} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";

@Component({
    selector: 'app-vote-user',
    templateUrl: './vote-user.component.html',
    styleUrl: './vote-user.component.scss'
})
export class VoteUserComponent implements AfterViewInit {

    user?: PacifistaWebUserLinkDTO;
    connected: boolean = false;
    loadingUsername: boolean = true;
    websites: VoteWebsiteDTO[] = [];

    constructor(private httpClient: HttpClient,
                private notificationService: NotificationService) {
    }

    ngAfterViewInit(): void {
        this.fetchVotesWebsites();
        this.fetchCurrentUser();
    }

    private fetchCurrentUser(): void {
        const userService = new UserAuthService(this.httpClient, environment.production);
        const webLinkService = new PacifistaWebUserLinkService(this.httpClient, environment.production);

        userService.currentUser().subscribe({
            next: () => {
                this.connected = true;

                webLinkService.getCurrentUserLink().subscribe({
                    next: userLink => {
                        this.user = userLink;
                        this.loadingUsername = false;
                    },
                    error: (errDto: ErrorDto) => {
                        this.loadingUsername = false;
                        if (errDto.status !== 404) {
                            this.notificationService.onErrorRequest(errDto);
                        }
                    }
                })

            },
            error: (errDto: ErrorDto) => {
                this.loadingUsername = false;
                if (errDto.status !== 401) {
                    this.notificationService.onErrorRequest(errDto);
                }
            }
        })
    }

    private fetchVotesWebsites(): void {
        new VoteService(this.httpClient, environment.production).getVoteWebsites().subscribe({
            next: (websites) => {
                this.websites = websites;
            },
            error: err => {
                this.notificationService.onErrorRequest(err);
            }
        })
    }

}
