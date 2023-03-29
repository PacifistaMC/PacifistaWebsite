import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil/accueil.component";
import {CgvComponent} from "./pages/legal/cgv/cgv.component";
import {CguComponent} from "./pages/legal/cgu/cgu.component";
import {AboutComponent} from "./pages/about/about.component";
import {JoinComponent} from "./pages/join/join.component";

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
