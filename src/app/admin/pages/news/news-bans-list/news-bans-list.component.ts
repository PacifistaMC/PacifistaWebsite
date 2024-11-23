import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../../components/paginated/paginated.component";
import {PacifistaNewsBanDTO, PacifistaNewsBanService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-news-bans-list',
  templateUrl: './news-bans-list.component.html',
  styleUrl: './news-bans-list.component.scss'
})
export class NewsBansListComponent extends PaginatedComponent<PacifistaNewsBanDTO, PacifistaNewsBanService> {

  constructor(httpClient: HttpClient,
              notificationService: NotificationService) {
    super(new PacifistaNewsBanService(httpClient, environment.production), httpClient, notificationService);
  }

}
