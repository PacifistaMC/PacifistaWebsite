import {Component, Renderer2} from '@angular/core';
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.scss']
})
export class ShopCheckoutComponent extends PacifistaPage {

  protected override readonly title: string = "Boutique - Panier";
  protected override readonly canonicalPath: string = "shop/checkout";
  protected override readonly pageDescription: string = "Boutique de Pacifista. Soutenez le serveur minecraft avec des avantages uniques !";

  constructor(title: Title,
              renderer: Renderer2) {
    super(title, renderer);
  }

}
