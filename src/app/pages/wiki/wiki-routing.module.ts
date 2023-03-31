import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WikiComponent } from './wiki.component';
import {BaseWikiComponent} from "./pages/base-wiki/base-wiki.component";

const routes: Routes = [
  {
    path: '', component: WikiComponent
  },
  {
    path: 'les-bases', component: BaseWikiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule { }
