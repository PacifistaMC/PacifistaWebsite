import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CgvComponent} from "./cgv.component";
import {CgvRoutingModule} from "./cgv-routing.module";


@NgModule({
  declarations: [
    CgvComponent
  ],
  imports: [
    CommonModule,
    CgvRoutingModule
  ]
})
export class CgvModule { }
