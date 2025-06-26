import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShopArticlesComponent} from "./shop-articles/shop-articles.component";
import {ShopCategoriesComponent} from "./shop-categories/shop-categories.component";
import {ShopArticleHandlerComponent} from "./shop-articles/shop-article-handler/shop-article-handler.component";
import {ShopCategoryHandleComponent} from "./shop-categories/shop-category-handle/shop-category-handle.component";

const routes: Routes = [
    {
        path: 'articles',
        component: ShopArticlesComponent
    },
    {
        path: 'article/:id',
        component: ShopArticleHandlerComponent
    },
    {
        path: 'categories',
        component: ShopCategoriesComponent
    },
    {
        path: 'category/:id',
        component: ShopCategoryHandleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopAdminRoutingModule { }