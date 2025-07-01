import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../../components/paginated/paginated.component";
import {PacifistaShopArticleDTO, PacifistaShopArticleService} from "@funixproductions/funixproductions-requests";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-shop-articles',
  standalone: false,
  templateUrl: './shop-articles.component.html',
  styleUrl: './shop-articles.component.scss'
})
export class ShopArticlesComponent extends PaginatedComponent<PacifistaShopArticleDTO, PacifistaShopArticleService> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super(new PacifistaShopArticleService(httpClient, environment.production), httpClient, notificationService);
  }

}
