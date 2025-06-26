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
import {InputNumberComponent} from "../../../components/inputs/input-number/input-number.component";
import {InputSelectServerComponent} from "../../../components/inputs/input-select-server/input-select-server.component";
import {SpinnerComponent} from "../../../components/spinner/spinner.component";
import {ShopCategoryHandleComponent} from "./shop-categories/shop-category-handle/shop-category-handle.component";
import {AdminImageFormComponent} from "../../components/admin-image-form/admin-image-form.component";
import {InputCheckboxComponent} from "../../../components/inputs/input-checkbox/input-checkbox.component";
import {SendButtonComponent} from "../../../components/buttons/send-button/send-button.component";
import {
    AdminCreateItemBtnTabComponent
} from "../../components/admin-create-item-btn-tab/admin-create-item-btn-tab.component";

@NgModule({
    declarations: [
        ShopArticlesComponent,
        ShopCategoriesComponent,
        ShopCategoryHandleComponent,
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
        MinecraftHeadComponent,
        InputNumberComponent,
        InputSelectServerComponent,
        SpinnerComponent,
        AdminImageFormComponent,
        InputCheckboxComponent,
        SendButtonComponent,
        AdminCreateItemBtnTabComponent
    ]
})
export class ShopAdminModule { }
