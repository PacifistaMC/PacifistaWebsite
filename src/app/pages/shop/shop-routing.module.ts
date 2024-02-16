import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop.component';
import {ShopCheckoutComponent} from "./shop-checkout/shop-checkout.component";
import {ShopRedirectAfterPaymentComponent} from "./shop-redirect-after-payment/shop-redirect-after-payment.component";
import {ShopErrorAfterPaymentComponent} from "./shop-error-after-payment/shop-error-after-payment.component";

const routes: Routes = [
  {
    path: '', component: ShopComponent
  },
  {
    path: 'checkout', component: ShopCheckoutComponent, children: [
      {
        path: 'check', component: ShopRedirectAfterPaymentComponent
      },
      {
        path: 'cancel', component: ShopErrorAfterPaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
