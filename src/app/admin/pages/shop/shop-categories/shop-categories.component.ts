import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../../components/paginated/paginated.component";
import {PacifistaShopCategoryDTO, PacifistaShopCategoryService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-shop-categories',
  standalone: false,
  templateUrl: './shop-categories.component.html',
  styleUrl: './shop-categories.component.scss'
})
export class ShopCategoriesComponent extends PaginatedComponent<PacifistaShopCategoryDTO, PacifistaShopCategoryService> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super(new PacifistaShopCategoryService(httpClient, environment.production), httpClient, notificationService);
  }

}
