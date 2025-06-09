import {Component, Inject, DOCUMENT} from '@angular/core';
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";

import {UserAuthService, UserPasswordResetRequestDTO} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {ReCaptchaV3Service} from "ng-recaptcha-2";

@Component({
    selector: 'app-user-forgot-password',
    templateUrl: './user-forgot-password.component.html',
    styleUrls: ['./user-forgot-password.component.scss'],
    standalone: false
})
export class UserForgotPasswordComponent extends PacifistaPage {

  protected override title: string = 'Mot de passe oublié';
  protected override canonicalPath: string = 'user/forgotpassword';
  protected override pageDescription: string = 'Page de récupération de mot de passe.';

  private authService: UserAuthService;

  email: string = '';

  loading: boolean = false;
  formSent: boolean = false;

  emailErrors: string[] = [];

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document,
              httpClient: HttpClient,
              private notificationService: NotificationService,
              private reCaptchaService: ReCaptchaV3Service) {
    super(title, doc);
    this.authService = new UserAuthService(httpClient, environment.production);
  }

  sendRequestReset() {
    const request = new UserPasswordResetRequestDTO();

    request.email = this.email;
    request.origin = "PACIFISTA_PUBLIC_WEB";

    this.loading = true;
    this.formSent = false;
    this.emailErrors = [];
    
    this.reCaptchaService.execute('resetPasswordRequest').subscribe((token: string) => {
      this.authService.resetPasswordRequest(request, token).subscribe({
        next: () => {
          this.loading = false;
          this.formSent = true;
          this.notificationService.info('Un email vous a été envoyé pour réinitialiser votre mot de passe.');
        },
        error: (error) => {
          this.loading = false;
          this.formSent = true;

          for (let fieldError of error.fieldErrors) {
            switch (fieldError.field) {
              case 'email':
                this.emailErrors.push(fieldError.message);
                break;
            }
          }

          this.notificationService.onErrorRequest(error);
        }
      });
    });
  }

}
