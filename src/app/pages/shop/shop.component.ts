import {Component, Inject} from '@angular/core';
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends PacifistaPage {

  protected override readonly title: string = "Boutique";
  protected override readonly canonicalPath: string = "shop";
  protected override readonly pageDescription: string = "Boutique de Pacifista. Soutenez le serveur minecraft avec des avantages uniques !";

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

}
