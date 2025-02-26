import {Component} from '@angular/core';
import ShopService from "../../../shop-service";

@Component({
    selector: 'app-shop-article-basket',
    templateUrl: './shop-article-basket.component.html',
    styleUrl: './shop-article-basket.component.scss',
    standalone: false
})
export class ShopArticleBasketComponent {

  constructor(protected shopService: ShopService) {
  }

}
