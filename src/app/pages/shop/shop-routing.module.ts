import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop.component';
import {ShopCheckoutComponent} from "./shop-checkout/shop-checkout.component";
import {ShopRedirectAfterPaymentComponent} from "./shop-redirect-after-payment/shop-redirect-after-payment.component";
import {ShopCancelAfterPaymentComponent} from "./shop-cancel-after-payment/shop-cancel-after-payment.component";

const routes: Routes = [
  {
    path: '', component: ShopComponent
  },
  {
    path: 'basket', component: ShopCheckoutComponent
  },
  {
    path: 'checkout', children: [
      {
        path: 'check', component: ShopRedirectAfterPaymentComponent
      },
      {
        path: 'cancel', component: ShopCancelAfterPaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
