import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShopArticlesComponent} from "./shop-articles/shop-articles.component";
import {ShopCategoriesComponent} from "./shop-categories/shop-categories.component";
import {ShopArticleHandlerComponent} from "./shop-articles/shop-article-handler/shop-article-handler.component";

const routes: Routes = [
    {
        path: 'articles',
        component: ShopArticlesComponent
    },
    {
        path: 'articles/:id',
        component: ShopArticleHandlerComponent
    },
    {
        path: 'categories',
        component: ShopCategoriesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopAdminRoutingModule { }