import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WikiComponent} from './wiki.component';

const routes: Routes = [
  {
    path: '', component: WikiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule { }
