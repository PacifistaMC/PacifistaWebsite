import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha";
import {environment} from "../../../environments/environment";

@NgModule({
  declarations: [
    UserComponent,
    UserRegisterComponent,
    UserPageComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaV3Module
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.reCaptchaSiteKey,
    },
  ],
})
export class UserModule { }
