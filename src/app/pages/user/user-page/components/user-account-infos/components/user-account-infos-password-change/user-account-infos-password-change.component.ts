import {Component, Input} from '@angular/core';
import {ErrorDto, UserAuthService, UserDTO, UserUpdateAccountDto} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../../../../environments/environment";

@Component({
    selector: 'app-user-account-infos-password-change',
    templateUrl: './user-account-infos-password-change.component.html',
    styleUrl: './user-account-infos-password-change.component.scss',
    standalone: false
})
export class UserAccountInfosPasswordChangeComponent {

  private readonly userService: UserAuthService
  @Input() user?: UserDTO

  currentPassword: string = ''
  currentPasswordErrors: string[] = []

  newPassword: string = ''
  newPasswordErrors: string[] = []

  newPasswordConfirmation: string = ''
  newPasswordConfirmationErrors: string[] = []

  formSent: boolean = false
  loading: boolean = false

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.userService = new UserAuthService(httpClient, environment.production)
  }

  updatePassword() {
    this.loading = true
    this.formSent = false
    this.currentPasswordErrors = []
    this.newPasswordErrors = []
    this.newPasswordConfirmationErrors = []

    const request = new UserUpdateAccountDto();
    request.oldPassword = this.currentPassword
    request.newPassword = this.newPassword
    request.newPasswordConfirmation = this.newPasswordConfirmation

    if (request.oldPassword.length === 0) {
      this.currentPasswordErrors.push("Le mot de passe actuel est obligatoire.")
      this.formSent = true
    }
    if (request.newPassword.length === 0) {
      this.newPasswordErrors.push("Le nouveau mot de passe est obligatoire.")
      this.formSent = true
    }
    if (request.newPasswordConfirmation.length === 0) {
      this.newPasswordConfirmationErrors.push("La confirmation du nouveau mot de passe est obligatoire.")
      this.formSent = true
    }
    if (request.newPassword !== request.newPasswordConfirmation) {
      this.newPasswordConfirmationErrors.push("Les mots de passe ne sont pas égaux.")
      this.newPasswordErrors.push("Les mots de passe ne sont pas égaux.")
      this.formSent = true
    }
    if (this.formSent) {
        this.loading = false
        return
    }

    this.userService.updateAccount(request).subscribe({
      next: () => {
        this.loading = false
        this.formSent = true
        this.notificationService.info("Votre mot de passe a bien été modifié avec succès.")
      },
      error: (err: ErrorDto) => {
        this.loading = false
        this.formSent = true

        for (let fieldError of err.fieldErrors) {
          switch (fieldError.field) {
            case 'oldPassword':
              this.currentPasswordErrors.push(fieldError.message)
              break
            case 'newPassword':
              this.newPasswordErrors.push(fieldError.message)
              break
            case 'newPasswordConfirmation':
              this.newPasswordConfirmationErrors.push(fieldError.message)
              break
          }
        }
        this.notificationService.onErrorRequest(err)
      }
    })
  }

}
