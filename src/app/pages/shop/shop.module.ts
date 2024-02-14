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

@NgModule({
    declarations: [
        ShopComponent,
        ShopCategoriesComponent,
        ShopArticlesComponent,
        ShopArticleComponent,
        ShopArticleModalComponent,
        ShopCheckoutComponent,
        ShopArticlePacifistaplusComponent,
        ShopArticleBasketComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ShopRoutingModule,
        FormsModule
    ]
})
export class ShopModule { }
