import {AfterViewInit, Component, Inject} from '@angular/core';
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {PacifistaShopCategoryDTO} from "@funixproductions/funixproductions-requests";
import ShopService from "./shop-service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends PacifistaPage implements AfterViewInit {

  protected override readonly title: string = "Boutique";
  protected override readonly canonicalPath: string = "shop";
  protected override readonly pageDescription: string = "Boutique de Pacifista. Soutenez le serveur minecraft avec des avantages uniques !";

  categorySelected?: PacifistaShopCategoryDTO;
  dropdownOpen: boolean = false;

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document,
              protected shopService: ShopService) {
    super(title, doc);
  }

  ngAfterViewInit(): void {
  }

}
