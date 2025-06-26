import {Component} from '@angular/core';
import ShopService from "../../../../shop-service";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-shop-basket-list',
    templateUrl: './shop-basket-list.component.html',
    styleUrl: './shop-basket-list.component.scss',
    standalone: false
})
export class ShopBasketListComponent {

  constructor(protected shopService: ShopService) {
  }

  getImageUrl(article: PacifistaShopArticleDTO): string {
        return ShopService.getImageUrl(article);
  }

}
