import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopCategoriesComponent } from './shop-categories/shop-categories.component';
import { ShopArticlesComponent } from './shop-articles/shop-articles.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ShopArticleComponent } from './shop-articles/shop-article/shop-article.component';


@NgModule({
  declarations: [
    ShopComponent,
    ShopCategoriesComponent,
    ShopArticlesComponent,
    ShopArticleComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        FontAwesomeModule
    ]
})
export class ShopModule { }
