import {Component} from '@angular/core';
import ShopService from "../../../../shop-service";

@Component({
    selector: 'app-shop-basket-list',
    templateUrl: './shop-basket-list.component.html',
    styleUrl: './shop-basket-list.component.scss',
    standalone: false
})
export class ShopBasketListComponent {

  constructor(protected shopService: ShopService) {
  }

}
