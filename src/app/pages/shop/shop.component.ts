import {Component, Inject, ViewChild, DOCUMENT} from '@angular/core';
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";

import {PacifistaShopCategoryDTO} from "@funixproductions/funixproductions-requests";
import ShopService from "./shop-service";
import {ShopArticlesComponent} from "./components/shop-articles/shop-articles.component";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    standalone: false
})
export class ShopComponent extends PacifistaPage {

  protected override readonly title: string = "Boutique";
  protected override readonly canonicalPath: string = "shop";
  protected override readonly pageDescription: string = "Boutique de Pacifista. Soutenez le serveur minecraft avec des avantages uniques !";

  categorySelected?: PacifistaShopCategoryDTO;

  @ViewChild(ShopArticlesComponent, { static: false }) protected shopArticlesComponent?: ShopArticlesComponent;

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document,
              protected shopService: ShopService) {
    super(title, doc);
  }

  protected changeCategory(category: PacifistaShopCategoryDTO) {
    this.categorySelected = category;
    this.navigateToArticles();
  }

  navigateToArticles() {
    this.shopArticlesComponent?.navigateToArticles();
  }

}
