import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewsComponent} from "./news.component";
import {NewsHandlerPageComponent} from "./news-handler-page/news-handler-page.component";
import {NewsBansListComponent} from "./news-bans-list/news-bans-list.component";

const routes: Routes = [
    {
        path: '',
        component: NewsComponent
    },
    {
        path: 'bans',
        component: NewsBansListComponent
    },
    {
        path: ':newsName',
        component: NewsHandlerPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }
