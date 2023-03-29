import { Component } from '@angular/core';
import UserService from "../../../services/funix-api/users/services/UserService";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {Router} from "@angular/router";
import UserLoginDTO from "../../../services/funix-api/users/dtos/UserLoginDTO";
import UserTokenDTO from "../../../services/funix-api/users/dtos/UserTokenDTO";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  username: string = '';
  password: string = '';
  stayLogin: boolean = false;

  constructor(private userAuthService: UserService,
              private reCaptchaService: ReCaptchaV3Service,
              private router: Router) {
  }

  login(): void {
    const loginRequest: UserLoginDTO = new UserLoginDTO();
    loginRequest.username = this.username;
    loginRequest.password = this.password;
    loginRequest.stayConnected = this.stayLogin;

    this.reCaptchaService.execute('login').subscribe((token: string) => {
      loginRequest.googleCaptcha = token;

      this.userAuthService.login(loginRequest).subscribe({
        next: (loginDto: UserTokenDTO) => {
          if (loginDto.token) {
            localStorage.setItem('user-token-requests', loginDto.token);
            this.router.navigate(['user'])
          } else {
            //todo popup error
          }
        },
        error: err => {
          //todo popup error
        }
      });
    });
  }

}
