import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {ShopComponent} from './shop.component';
import {ShopCategoriesComponent} from './components/shop-categories/shop-categories.component';
import {ShopArticlesComponent} from './components/shop-articles/shop-articles.component';
import {ShopArticleComponent} from './components/shop-articles/shop-article/shop-article.component';
import {ShopArticleModalComponent} from './components/shop-articles/shop-article-modal/shop-article-modal.component';
import {ShopCheckoutComponent} from './shop-checkout/shop-checkout.component';
import {HttpClientModule} from "@angular/common/http";
import {
    ShopArticlePacifistaplusComponent
} from "./components/shop-articles/shop-article/shop-article-pacifistaplus/shop-article-pacifistaplus.component";
import {FormsModule} from "@angular/forms";
import {ShopArticleBasketComponent} from "./components/shop-articles/shop-article-basket/shop-article-basket.component";
import ShopService from "./shop-service";
import {
    ShopBasketListComponent
} from "./components/shop-articles/shop-article-basket/shop-basket-list/shop-basket-list.component";
import {ShopPaymentPaypalComponent} from "./shop-checkout/shop-payment-paypal/shop-payment-paypal.component";
import {
    ShopPaymentCreditCardComponent
} from "./shop-checkout/shop-payment-credit-card/shop-payment-credit-card.component";
import {ShopRedirectAfterPaymentComponent} from "./shop-redirect-after-payment/shop-redirect-after-payment.component";
import {ShopCancelAfterPaymentComponent} from "./shop-cancel-after-payment/shop-cancel-after-payment.component";
import {SendButtonComponent} from "../../components/buttons/send-button/send-button.component";
import {
    ShopPaymentPaysafecardComponent
} from "./shop-checkout/shop-payment-paysafecard/shop-payment-paysafecard.component";
import {InputTextComponent} from "../../components/inputs/input-text/input-text.component";
import {InputNumberComponent} from "../../components/inputs/input-number/input-number.component";

@NgModule({
    declarations: [
        ShopComponent,
        ShopCategoriesComponent,
        ShopArticlesComponent,
        ShopArticleComponent,
        ShopArticleModalComponent,
        ShopCheckoutComponent,
        ShopArticlePacifistaplusComponent,
        ShopArticleBasketComponent,
        ShopBasketListComponent,
        ShopPaymentPaypalComponent,
        ShopPaymentCreditCardComponent,
        ShopRedirectAfterPaymentComponent,
        ShopCancelAfterPaymentComponent,
        ShopPaymentPaysafecardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ShopRoutingModule,
        FormsModule,
        SendButtonComponent,
        InputTextComponent,
        InputNumberComponent
    ],
    providers: [
        ShopService
    ]
})
export class ShopModule { }
