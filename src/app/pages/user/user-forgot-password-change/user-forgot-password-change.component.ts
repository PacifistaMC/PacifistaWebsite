import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthService, UserPasswordResetDTO} from "@funixproductions/funixproductions-requests";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-user-forgot-password-change',
  templateUrl: './user-forgot-password-change.component.html',
  styleUrl: './user-forgot-password-change.component.scss'
})
export class UserForgotPasswordChangeComponent implements OnInit {

  private token?: string;
  private authService: UserAuthService;

  password: string = '';
  passwordConfirm: string = '';

  loading: boolean = false;
  formSent: boolean = false;

  passwordErrors: string[] = [];
  passwordConfirmErrors: string[] = [];

  constructor(private route: ActivatedRoute,
              private routing: Router,
              private reCaptchaService: ReCaptchaV3Service,
              private notificationService: NotificationService,
              httpClient: HttpClient) {
    this.authService = new UserAuthService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.token = params['token'];
    });
  }

  changePassword() {
    const request = new UserPasswordResetDTO();

    request.resetToken = this.token;
    request.newPassword = this.password;
    request.newPasswordConfirmation = this.passwordConfirm;

    this.loading = true;
    this.formSent = false;

    this.passwordErrors = [];
    this.passwordConfirmErrors = [];

    this.reCaptchaService.execute('resetPassword').subscribe((token: string) => {
      this.authService.resetPassword(request, token).subscribe({
        next: () => {
          this.loading = false;
          this.formSent = true;
          this.notificationService.info('Votre mot de passe a été modifié.');
          this.routing.navigate(['/user', 'login']);
        },
        error: (error) => {
          this.loading = false;
          this.formSent = true;

          for (let fieldError of error.fieldErrors) {
            switch (fieldError.field) {
              case 'newPassword':
                this.passwordErrors.push(fieldError.message);
                break;
              case 'newPasswordConfirmation':
                this.passwordConfirmErrors.push(fieldError.message);
                break;
            }
          }

          this.notificationService.onErrorRequest(error);
        }
      });
    });
  }

}
