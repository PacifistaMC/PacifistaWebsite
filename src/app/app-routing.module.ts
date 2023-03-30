import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil/accueil.component";
import {CgvComponent} from "./pages/legal/cgv/cgv.component";
import {CguComponent} from "./pages/legal/cgu/cgu.component";
import {AboutComponent} from "./pages/about/about.component";
import {JoinComponent} from "./pages/join/join.component";
import {NewsListPageComponent} from "./pages/news/news-list-page/news-list-page.component";
import {WikiPageComponent} from "./pages/wiki/wiki-page/wiki-page.component";
import {VotePageComponent} from "./pages/vote/vote-page/vote-page.component";

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
    path: 'wiki',
    component: WikiPageComponent
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
