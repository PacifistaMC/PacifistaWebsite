import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";
import ShopService from 'src/app/pages/shop/shop-service';
import ShopCart from "../../../../../../ShopCart";

@Component({
    selector: 'app-pacifistaplus-article',
    templateUrl: './pacifistaplus-article.component.html',
    styleUrl: './pacifistaplus-article.component.scss',
    standalone: false
})
export class PacifistaplusArticleComponent implements AfterViewInit {

  @Input() oneMonthArticle?: PacifistaShopArticleDTO;
  @Input() article?: PacifistaShopArticleDTO;
  @Input() months: number = 1;
  @Output() addedCart = new EventEmitter<boolean>();

  priceWihoutDiscount: string | undefined;

  constructor(protected shopService: ShopService) {
  }

  ngAfterViewInit(): void {
    this.priceWihoutDiscount = this.getPriceWithoutDiscount();
  }

  addArticleToBasket(): void {
    if (this.article) {
      this.shopService.addArticleToBasket(new ShopCart(this.article, 1));
      this.addedCart.emit(true);
    }
  }

  private getPriceWithoutDiscount(): string | undefined {
    if (this.months < 2) {
      return undefined
    } else if (this.oneMonthArticle?.priceWithTax) {
      return this.shopService.formatPrice(this.oneMonthArticle.priceWithTax * this.months)
    } else {
      return undefined
    }
  }

}
