import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsListPageComponent} from "./news-list-page/news-list-page.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NewsPageComponent} from './news-page/news-page.component';
import {NewsRoutingModule} from "./news-routing.module";

@NgModule({
  declarations: [
    NewsListPageComponent,
    NewsCardComponent,
    NewsPageComponent,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    NewsCardComponent
  ]
})
export class NewsModule { }
