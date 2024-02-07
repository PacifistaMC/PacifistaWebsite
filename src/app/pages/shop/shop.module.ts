import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {ShopComponent} from './shop.component';
import {ShopCategoriesComponent} from './components/shop-categories/shop-categories.component';
import {ShopArticlesComponent} from './components/shop-articles/shop-articles.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ShopArticleComponent} from './components/shop-articles/shop-article/shop-article.component';
import {ShopArticleModalComponent} from './components/shop-articles/shop-article-modal/shop-article-modal.component';
import {ShopCheckoutComponent} from './shop-checkout/shop-checkout.component';
import {ShopBasketLittleComponent} from './components/shop-basket-little/shop-basket-little.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    ShopComponent,
    ShopCategoriesComponent,
    ShopArticlesComponent,
    ShopArticleComponent,
    ShopArticleModalComponent,
    ShopCheckoutComponent,
    ShopBasketLittleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShopRoutingModule,
    FontAwesomeModule
  ]
})
export class ShopModule { }
