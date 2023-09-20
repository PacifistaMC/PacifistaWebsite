import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CguComponent} from "./cgu.component";
import {CguRoutingModule} from "./cgu-routing.module";


@NgModule({
  declarations: [
    CguComponent
  ],
  imports: [
    CommonModule,
    CguRoutingModule
  ]
})
export class CguModule { }
