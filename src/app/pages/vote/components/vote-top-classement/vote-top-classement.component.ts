import {AfterViewInit, Component} from '@angular/core';
import {VotesCountDTO, VoteService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-vote-top-classement',
  templateUrl: './vote-top-classement.component.html',
  styleUrl: './vote-top-classement.component.scss'
})
export class VoteTopClassementComponent implements AfterViewInit {

  private readonly voteApiService: VoteService;
  protected topVoters: VotesCountDTO[] = [];

  constructor(http: HttpClient,
              private notificationService: NotificationService) {
    this.voteApiService = new VoteService(http, environment.production)
  }

  ngAfterViewInit(): void {
    let date = new Date();

    this.voteApiService.getTopVoters(date.getMonth() + 1, date.getFullYear()).subscribe({
      next: (response) => {
        this.topVoters = response;
      }
    })
  }

}
