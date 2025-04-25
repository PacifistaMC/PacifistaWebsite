import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {NgbdSearchableHeader, NgbdSortableHeader} from "../../../components/paginated/paginated.component";
import {ShopAdminRoutingModule} from "./shop-admin-routing.module";
import {ShopArticlesComponent} from "./shop-articles/shop-articles.component";
import {ShopCategoriesComponent} from "./shop-categories/shop-categories.component";
import {ShopArticleHandlerComponent} from "./shop-articles/shop-article-handler/shop-article-handler.component";

@NgModule({
    declarations: [
        ShopArticlesComponent,
        ShopCategoriesComponent,
        ShopArticleHandlerComponent
    ],
    imports: [
        CommonModule,
        ShopAdminRoutingModule,
        NgbPagination,
        NgbdSortableHeader,
        NgbdSearchableHeader
    ]
})
export class ShopAdminModule { }
