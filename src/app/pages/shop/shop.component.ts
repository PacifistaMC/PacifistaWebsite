import {Component, Inject} from '@angular/core';
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {PacifistaShopArticleDTO, PacifistaShopCategoryDTO} from "@funixproductions/funixproductions-requests";
import ShopCart from "./ShopCart";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends PacifistaPage {

  protected override readonly title: string = "Boutique";
  protected override readonly canonicalPath: string = "shop";
  protected override readonly pageDescription: string = "Boutique de Pacifista. Soutenez le serveur minecraft avec des avantages uniques !";

  protected readonly basket: Map<PacifistaShopArticleDTO, number> = new Map<PacifistaShopArticleDTO, number>();

  categorySelected?: PacifistaShopCategoryDTO;
  dropdownOpen: boolean = false;

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

  addArticleToBasket(shopCart: ShopCart): void {

  }

  removeArticleFromBasket(article: PacifistaShopArticleDTO, amount: number): void {

  }

}
