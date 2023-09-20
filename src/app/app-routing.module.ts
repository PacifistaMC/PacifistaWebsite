import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil.component";

const routes: Routes = [
  {
    path: '',
    component: AccueilComponent
  },
  {
    path: 'cgv',
    loadChildren: () => import('./pages/legal/cgv/cgv.module').then(m => m.CgvModule)
  },
  {
    path: 'cgu',
    loadChildren: () => import('./pages/legal/cgu/cgu.module').then(m => m.CguModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./pages/join/join.module').then(m => m.JoinModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./pages/vote/vote.module').then(m => m.VoteModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'wiki',
    loadChildren: () => import('./pages/wiki/wiki.module').then(m => m.WikiModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
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
