import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewsListPageComponent} from "./news-list-page/news-list-page.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {NewsPageComponent} from './news-page/news-page.component';
import {NewsRoutingModule} from "./news-routing.module";
import NewsService from "./NewsService";

@NgModule({
    declarations: [
        NewsListPageComponent,
        NewsCardComponent,
        NewsPageComponent,
    ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        NgOptimizedImage
    ],
    providers: [
        NewsService
    ],
    exports: [
        NewsCardComponent
    ]
})
export class NewsModule { }
