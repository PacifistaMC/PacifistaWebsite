import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WikiRoutingModule} from './wiki-routing.module';
import {WikiComponent} from './wiki.component';

@NgModule({
  declarations: [
    WikiComponent,
  ],
  imports: [
    CommonModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
