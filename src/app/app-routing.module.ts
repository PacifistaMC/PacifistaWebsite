import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil/accueil.component";
import {CgvComponent} from "./pages/legal/cgv/cgv.component";
import {CguComponent} from "./pages/legal/cgu/cgu.component";

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
