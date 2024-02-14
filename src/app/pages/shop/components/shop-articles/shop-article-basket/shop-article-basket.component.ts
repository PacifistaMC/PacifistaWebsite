import {Component, Input} from '@angular/core';
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-shop-article-basket',
  templateUrl: './shop-article-basket.component.html',
  styleUrl: './shop-article-basket.component.scss'
})
export class ShopArticleBasketComponent {

  @Input() basket: Map<PacifistaShopArticleDTO, number> = new Map<PacifistaShopArticleDTO, number>();

  countTotalPrice(): number {
    let totalPrice = 0;

    this.basket.forEach((amount, article) => {
      totalPrice += (article.priceWithTax ?? 0) * amount;
    });
    return totalPrice;
  }
}
