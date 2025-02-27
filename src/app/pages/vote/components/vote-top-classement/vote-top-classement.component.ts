import {AfterViewInit, Component} from '@angular/core';
import {VotesCountDTO, VoteService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-vote-top-classement',
    templateUrl: './vote-top-classement.component.html',
    styleUrl: './vote-top-classement.component.scss',
    standalone: false
})
export class VoteTopClassementComponent implements AfterViewInit {

  protected topVoters: VotesCountDTO[] = [];

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    let date = new Date();

    new VoteService(this.http, environment.production).getTopVoters(date.getMonth() + 1, date.getFullYear()).subscribe({
      next: (response) => {
        this.topVoters = response;
      }
    })
  }

}
