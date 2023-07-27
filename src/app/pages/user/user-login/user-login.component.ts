import {Component} from '@angular/core';
import UserService from "../../../services/funixproductions-api/users/services/UserService";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {Router} from "@angular/router";
import UserLoginDTO from "../../../services/funixproductions-api/users/dtos/UserLoginDTO";
import UserTokenDTO from "../../../services/funixproductions-api/users/dtos/UserTokenDTO";
import NotificationService from "../../../services/core/notifications/services/NotificationService";
import FunixProdHttpClient from "../../../services/core/http/services/FunixProdHttpClient";
import NotificationToast from "../../../services/core/notifications/entities/NotificationToast";

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
              private router: Router,
              private notificationService: NotificationService) {
  }

  login(): void {
    const loginRequest: UserLoginDTO = new UserLoginDTO();
    loginRequest.username = this.username;
    loginRequest.password = this.password;
    loginRequest.stayConnected = this.stayLogin;

    this.reCaptchaService.execute('login').subscribe((token: string) => {
      this.userAuthService.login(loginRequest, token).subscribe({
        next: (loginDto: UserTokenDTO) => {
          if (loginDto.token) {
            localStorage.setItem(FunixProdHttpClient.LOCAL_STORAGE_KEY_AUTH, loginDto.token);
            this.router.navigate(['user'])
          } else {
            this.notificationService.show(new NotificationToast('Erreur', 'Une erreur est survenue lors de la connexion'));
          }
        },
        error: err => {
          this.notificationService.onErrorRequest(err, 'Impossible de se connecter');
        }
      });
    });
  }

}
