import { Component } from '@angular/core';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.scss']
})
export class UserForgotPasswordComponent {

  email: string = '';

  sendRequestReset() {

  }

}
