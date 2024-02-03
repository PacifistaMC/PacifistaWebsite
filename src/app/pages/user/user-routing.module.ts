import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserPageComponent} from "./user-page/user-page.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserForgotPasswordComponent} from "./user-forgot-password/user-forgot-password.component";
import {UserForgotPasswordChangeComponent} from "./user-forgot-password-change/user-forgot-password-change.component";

const routes: Routes = [
    { path: '', component: UserComponent, children: [
            {
                path: '',
                component: UserPageComponent
            },
            {
                path: 'register',
                component: UserRegisterComponent
            },
            {
                path: 'login',
                component: UserLoginComponent
            },
            {
                path: 'forgotpassword',
                component: UserForgotPasswordComponent
            },
            {
                path: 'reset-password',
                component: UserForgotPasswordChangeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
