import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsListPageComponent} from "./news-list-page/news-list-page.component";
import {NewsPageComponent} from "./news-page/news-page.component";

const routes: Routes = [
  {
    path: '',
    component: NewsListPageComponent,
  },
  {
    path: ':newsName',
    component: NewsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
