import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../components/paginated/paginated.component";
import {PacifistaNewsDTO} from "@funixproductions/funixproductions-requests";
import DummyNewsCrudClient from "./DummyNewsCrudClient";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../services/notifications/services/NotificationService";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
    standalone: false
})
export class NewsComponent extends PaginatedComponent<PacifistaNewsDTO, DummyNewsCrudClient> {

  constructor(httpClient: HttpClient,
              notificationService: NotificationService) {
    super(new DummyNewsCrudClient(httpClient), httpClient, notificationService);
  }

}
