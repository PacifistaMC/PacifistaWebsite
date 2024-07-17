import {Component, Input, OnInit} from '@angular/core';
import {VoteService, VoteWebsiteDTO} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {interval, takeWhile} from "rxjs";

@Component({
  selector: 'app-vote-user-website',
  templateUrl: './vote-user-website.component.html',
  styleUrl: './vote-user-website.component.scss'
})
export class VoteUserWebsiteComponent implements OnInit {

  @Input('voteWebsite') voteWebsite: VoteWebsiteDTO = new VoteWebsiteDTO("","","", 10);
  @Input('voteUser') voteUser: string = "";

  private readonly voteService: VoteService;

  availableAt?: Date;
  countdown: string = '00:00:00';
  loading: boolean = false;

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.voteService = new VoteService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.voteService.checkVote(this.voteWebsite.enumName).subscribe({
      next: (voteDTO) => {
        this.availableAt = voteDTO.nextVoteDate;

        if (this.availableAt) {
          this.startCountdown(new Date(this.availableAt));
        }
      }
    })
  }

  makeVote() {
    this.loading = true;

    this.voteService.makeVote(this.voteWebsite.enumName, this.voteUser).subscribe({
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
  }

  private checkVote() {
    this.voteService.checkVote(this.voteWebsite.enumName).subscribe({
      next: (voteDTO) => {
        if (voteDTO.voteValidationDate && voteDTO.nextVoteDate) {
          this.availableAt = voteDTO.nextVoteDate;
          this.loading = false;
          this.startCountdown(this.availableAt);
        }
      }
    })
  }

  private openVoteWebsite() {
    window.open(this.voteWebsite.urlVote, '_blank');
  }

  private startCountdown(targetDate: Date): void {
    const intervalId = setInterval(() => {

      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(intervalId);
        this.countdown = '00:00:00';
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
