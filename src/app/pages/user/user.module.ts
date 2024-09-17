import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha-2";
import {environment} from "../../../environments/environment";
import {UserForgotPasswordComponent} from './user-forgot-password/user-forgot-password.component';
import {InputEmailComponent} from "../../components/inputs/input-email/input-email.component";
import {SendButtonComponent} from "../../components/buttons/send-button/send-button.component";
import {InputTextComponent} from "../../components/inputs/input-text/input-text.component";
import {InputSecretComponent} from "../../components/inputs/input-secret/input-secret.component";
import {InputCheckboxComponent} from "../../components/inputs/input-checkbox/input-checkbox.component";
import {UserForgotPasswordChangeComponent} from "./user-forgot-password-change/user-forgot-password-change.component";
import {UserAccountInfosComponent} from "./user-page/components/user-account-infos/user-account-infos.component";
import {
    UserAccountIntegrationsComponent
} from "./user-page/components/user-account-integrations/user-account-integrations.component";
import {
    UserAccountInvoicesComponent
} from "./user-page/components/user-account-invoices/user-account-invoices.component";
import {
    UserAccountInfosPersonalDataComponent
} from "./user-page/components/user-account-infos/components/user-account-infos-personal-data/user-account-infos-personal-data.component";
import {
    UserAccountInfosPasswordChangeComponent
} from "./user-page/components/user-account-infos/components/user-account-infos-password-change/user-account-infos-password-change.component";
import {
    UserAccountIntegrationsMinecraftAccountComponent
} from "./user-page/components/user-account-integrations/components/user-account-integrations-minecraft-acccount/user-account-integrations-minecraft-account.component";
import {MinecraftHeadComponent} from "../../components/minecraft-head/minecraft-head.component";
import {MinecraftCommandComponent} from "../../components/minecraft-command/minecraft-command.component";
import {
    UserAccountIntegrationsMinecraftAccountCreateNewComponent
} from "./user-page/components/user-account-integrations/components/user-account-integrations-minecraft-acccount/user-account-integrations-minecraft-account-create-new/user-account-integrations-minecraft-account-create-new.component";
import {UserCountrySelectComponent} from "./user-country-select/user-country-select.component";

@NgModule({ declarations: [
        UserComponent,
        UserRegisterComponent,
        UserPageComponent,
        UserLoginComponent,
        UserForgotPasswordComponent,
        UserForgotPasswordChangeComponent,
        UserAccountInfosComponent,
        UserCountrySelectComponent,
        UserAccountIntegrationsComponent,
        UserAccountInvoicesComponent,
        UserAccountInfosPersonalDataComponent,
        UserAccountInfosPasswordChangeComponent,
        UserAccountIntegrationsMinecraftAccountComponent,
        UserAccountIntegrationsMinecraftAccountCreateNewComponent
    ], imports: [CommonModule,
        UserRoutingModule,
        FormsModule,
        RecaptchaV3Module,
        InputEmailComponent,
        SendButtonComponent,
        InputTextComponent,
        InputSecretComponent,
        InputCheckboxComponent,
        MinecraftHeadComponent,
        MinecraftCommandComponent, NgOptimizedImage], providers: [
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.reCaptchaSiteKey,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class UserModule { }
