import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CgvComponent} from "./pages/legal/cgv/cgv.component";
import {CguComponent} from "./pages/legal/cgu/cgu.component";
import {AboutComponent} from "./pages/about/about.component";
import {JoinComponent} from "./pages/join/join.component";
import {NewsListPageComponent} from "./pages/news/news-list-page/news-list-page.component";
import {VotePageComponent} from "./pages/vote/vote-page/vote-page.component";
import {AccueilComponent} from "./pages/accueil/accueil.component";

const routes: Routes = [
  {
    path: '',
    component: AccueilComponent
  },
  {
    path: 'cgv',
    component: CgvComponent
  },
  {
    path: 'cgu',
    component: CguComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'news',
    component: NewsListPageComponent
  },
  {
    path: 'vote',
    component: VotePageComponent
  },
  {
    path: 'shop', loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'wiki', loadChildren: () => import('./pages/wiki/wiki.module').then(m => m.WikiModule)
  },
  {
    path: 'news', loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
