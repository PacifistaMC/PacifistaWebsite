import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {NgbdSearchableHeader, NgbdSortableHeader} from "../../../components/paginated/paginated.component";
import {ShopAdminRoutingModule} from "./shop-admin-routing.module";
import {ShopArticlesComponent} from "./shop-articles/shop-articles.component";
import {ShopCategoriesComponent} from "./shop-categories/shop-categories.component";
import {ShopArticleHandlerComponent} from "./shop-articles/shop-article-handler/shop-article-handler.component";
import {ShopCategorySearchComponent} from "./shop-categories/shop-category-search/shop-category-search.component";
import {InputTextComponent} from "../../../components/inputs/input-text/input-text.component";
import {MinecraftHeadComponent} from "../../../components/minecraft-head/minecraft-head.component";

@NgModule({
    declarations: [
        ShopArticlesComponent,
        ShopCategoriesComponent,
        ShopArticleHandlerComponent,
        ShopCategorySearchComponent
    ],
    imports: [
        CommonModule,
        ShopAdminRoutingModule,
        NgbPagination,
        NgbdSortableHeader,
        NgbdSearchableHeader,
        InputTextComponent,
        MinecraftHeadComponent
    ]
})
export class ShopAdminModule { }
