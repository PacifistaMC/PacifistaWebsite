import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {VoteService, VoteWebsiteDTO} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {interval, takeWhile} from "rxjs";
import {ReCaptchaV3Service} from "ng-recaptcha-2";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-vote-user-website',
    templateUrl: './vote-user-website.component.html',
    styleUrl: './vote-user-website.component.scss',
    standalone: false
})
export class VoteUserWebsiteComponent implements OnInit {

    @Input('voteWebsite') voteWebsite: VoteWebsiteDTO = new VoteWebsiteDTO("","","", 10);

    private readonly voteService: VoteService;
    private readonly window?: (WindowProxy & typeof globalThis) | null;

    availableAt?: Date;
    countdown: string = '00:00:00';
    loading: boolean = false;

    constructor(httpClient: HttpClient,
                private notificationService: NotificationService,
                private reCaptchaService: ReCaptchaV3Service,
                @Inject(PLATFORM_ID) private platformId: object,
                @Inject(DOCUMENT) private document: Document) {
        this.voteService = new VoteService(httpClient, environment.production);

        if (isPlatformBrowser(this.platformId)) {
            this.window = document.defaultView
        }
    }

    ngOnInit(): void {
        this.voteService.checkVote(this.voteWebsite.enumName).subscribe({
            next: (voteDTO) => {
                this.availableAt = voteDTO.nextVoteDate;

                if (this.availableAt) {
                    this.availableAt = new Date(this.availableAt);

                    if (this.availableAt > new Date()) {
                        this.startCountdown(this.availableAt);
                    } else {
                        this.availableAt = undefined;
                    }
                }
            }
        })
    }

    convertMinutesInHours(): string {
        const minutes = this.voteWebsite.coolDownInMinutes;
        const hours = Math.floor(minutes / 60);
        const minutesLeft = minutes % 60;

        if (hours < 1) {
            return `${minutes}min`;
        } else {
            if (minutesLeft < 1) {
                return `${hours}h`;
            } else {
                return `${hours}h${minutesLeft}`;
            }
        }
    }

    makeVote() {
        this.loading = true;

        this.reCaptchaService.execute('VOTE_PACIFISTA').subscribe((token: string) => {
            this.voteService.makeVote(this.voteWebsite.enumName, token).subscribe({
                next: (voteDTO) => {
                    this.availableAt = voteDTO.nextVoteDate;

                    if (!this.availableAt) {
                        interval(5000)
                            .pipe(takeWhile(() => !this.availableAt))
                            .subscribe(() => this.checkVote());
                        this.openVoteWebsite();
                    }
                },
                error: err => {
                    this.notificationService.onErrorRequest(err);
                    this.loading = false;
                }
            })
        });
    }

    private checkVote() {
        this.voteService.checkVote(this.voteWebsite.enumName).subscribe({
            next: (voteDTO) => {
                if (voteDTO.voteValidationDate && voteDTO.nextVoteDate) {
                    this.loading = false;

                    this.availableAt = new Date(voteDTO.nextVoteDate);

                    if (this.availableAt > new Date()) {
                        this.startCountdown(this.availableAt);
                    } else {
                        this.availableAt = undefined;
                    }
                }
            }
        })
    }

    private openVoteWebsite() {
        if (this.window) {
            window.open(this.voteWebsite.urlVote, '_blank');
        }
    }

    private startCountdown(targetDate: Date): void {
        const intervalId = setInterval(() => {

            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(intervalId);
                this.countdown = '00:00:00';
                this.availableAt = undefined;
            } else {
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                this.countdown = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
            }
        }, 1000);
    }

    private pad(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

}
