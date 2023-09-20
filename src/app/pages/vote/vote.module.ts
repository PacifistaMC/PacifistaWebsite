import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoteComponent} from "./vote.component";
import {VoteRoutingModule} from "./vote-routing.module";


@NgModule({
  declarations: [
    VoteComponent
  ],
  imports: [
    CommonModule,
    VoteRoutingModule
  ]
})
export class VoteModule { }
