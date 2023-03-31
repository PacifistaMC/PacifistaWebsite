import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';
import { BaseWikiComponent } from './pages/base-wiki/base-wiki.component';
import { WikiCardComponent } from './compoments/wiki-card/wiki-card.component';


@NgModule({
  declarations: [
    WikiComponent,
    BaseWikiComponent,
    WikiCardComponent
  ],
  imports: [
    CommonModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
