import {AfterViewInit, Component} from '@angular/core';
import {VoteService, VoteWebsiteDTO} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";

@Component({
  selector: 'app-vote-user',
  templateUrl: './vote-user.component.html',
  styleUrl: './vote-user.component.scss'
})
export class VoteUserComponent implements AfterViewInit {

  username?: string;
  websites: VoteWebsiteDTO[] = [];

  private readonly service: VoteService;

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.service = new VoteService(httpClient, environment.production);
  }

  setUsername(username?: string) {
    if (username) {
      this.username = username;
    } else {
      this.username = undefined;
    }
  }

  ngAfterViewInit(): void {
    this.service.getVoteWebsites().subscribe({
      next: (websites) => {
        this.websites = websites;
      },
      error: err => {
        this.notificationService.onErrorRequest(err);
      }
    })
  }

}
