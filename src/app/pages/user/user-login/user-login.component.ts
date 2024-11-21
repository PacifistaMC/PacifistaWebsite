import {Component, Inject} from '@angular/core';
import {ReCaptchaV3Service} from "ng-recaptcha-2";
import {Router} from "@angular/router";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {
  ErrorDto,
  FunixprodHttpClient,
  UserAuthService,
  UserLoginDTO,
  UserTokenDTO
} from "@funixproductions/funixproductions-requests";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {environment} from "../../../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent extends PacifistaPage {

  protected override title: string = 'Connexion';
  protected override canonicalPath: string = 'user/login';
  protected override pageDescription: string = 'Connexion sur le site de Pacifista. Page de connexion.';

  username: string = '';
  password: string = '';
  stayLogin: boolean = false;

  loading: boolean = false;
  formSent: boolean = false;

  usernameErrors: string[] = [];
  passwordErrors: string[] = [];

  private userAuthService: UserAuthService;

  constructor(private reCaptchaService: ReCaptchaV3Service,
              private router: Router,
              private notificationService: NotificationService,
              titleService: Title,
              @Inject(DOCUMENT) doc: Document,
              httpClient: HttpClient) {
    super(titleService, doc);
    this.userAuthService = new UserAuthService(httpClient, environment.production);
  }

  login(): void {
    const loginRequest: UserLoginDTO = new UserLoginDTO();
    loginRequest.username = this.username;
    loginRequest.password = this.password;
    loginRequest.stayConnected = this.stayLogin;

    this.formSent = false;
    this.loading = true;
    this.passwordErrors = [];
    this.usernameErrors = [];

    this.reCaptchaService.execute('login').subscribe((token: string) => {
      this.userAuthService.login(loginRequest, token).subscribe({
        next: (loginDto: UserTokenDTO) => {
          this.formSent = true;
          this.loading = false;

          if (loginDto.token) {
            localStorage.setItem(FunixprodHttpClient.accessTokenLocalStorageName, loginDto.token);
            this.router.navigate(['user'])
          } else {
            this.notificationService.error('Une erreur est survenue lors de la connexion');
          }
        },
        error: (err: ErrorDto) => {
          this.formSent = true;
          this.loading = false;

          for (let fieldError of err.fieldErrors) {
            switch (fieldError.field) {
              case 'username':
                this.usernameErrors.push(fieldError.message);
                break;
              case 'password':
                this.passwordErrors.push(fieldError.message);
                break;
            }
          }

          if (this.usernameErrors.length === 0 && this.passwordErrors.length === 0) {
            this.usernameErrors.push(err.error);
            this.passwordErrors.push(err.error);
          }

          this.notificationService.onErrorRequest(err);
        }
      });
    });
  }

}
