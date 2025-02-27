import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-shop-cancel-after-payment',
    templateUrl: './shop-cancel-after-payment.component.html',
    styleUrl: './shop-cancel-after-payment.component.scss',
    standalone: false
})
export class ShopCancelAfterPaymentComponent {

  constructor(private router: Router) {
  }

  goToShop() {
    this.router.navigate(['/shop', 'basket']);
  }

}
