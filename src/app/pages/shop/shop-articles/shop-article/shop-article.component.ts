import {Component, Input} from '@angular/core';
import ShopItemDTO from "../../../../services/pacifista-api/shop/categories/dtos/ShopItemDTO";

@Component({
  selector: 'app-shop-article',
  templateUrl: './shop-article.component.html',
  styleUrls: ['./shop-article.component.scss']
})
export class ShopArticleComponent {

  @Input() article: ShopItemDTO = new ShopItemDTO();

}
