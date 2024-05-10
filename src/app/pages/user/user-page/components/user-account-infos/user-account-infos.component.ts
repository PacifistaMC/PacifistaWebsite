import {AfterViewInit, Component, Input} from '@angular/core';
import {
  ErrorDto,
  UserAuthService,
  UserCountry,
  UserDTO,
  UserUpdateAccountDto
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {Country} from "@angular-material-extensions/select-country";

@Component({
  selector: 'app-user-account-infos',
  templateUrl: './user-account-infos.component.html',
  styleUrl: './user-account-infos.component.scss'
})
export class UserAccountInfosComponent implements AfterViewInit {

  private readonly userService: UserAuthService
  @Input() user: UserDTO = new UserDTO()

  username: string = ''
  usernameErrors: string[] = []
  email: string = ''
  emailErrors: string[] = []
  country: UserCountry = new UserCountry()
  currentCountry?: Country
  countryErrors: string[] = []
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

  ngAfterViewInit(): void {
    this.username = this.user.username
    this.email = this.user.email
    this.country = this.user.country

    this.currentCountry = new class implements Country {
      alpha2Code: string;
      alpha3Code: string;
      callingCode: string;
      name: string;
      numericCode: string;

      constructor(country: UserCountry) {
        this.alpha2Code = country.countryCode2Chars
        this.alpha3Code = country.countryCode3Chars
        this.name = country.name
        this.numericCode = country.code.toString()
        this.callingCode = ''
      }
    }(this.country)
  }

  updateAccount() {
    const request = new UserUpdateAccountDto();

    request.username = this.username
    request.email = this.email
    request.country = this.country

    this.loading = true
    this.formSent = false
    this.userService.updateAccount(request).subscribe({
      next: user => {
        this.loading = false
        this.formSent = true

        this.username = user.username
        this.email = user.email
        this.country = user.country
        this.notificationService.info("Vos informations ont été mises à jour avec succès.")
      },
      error: (err: ErrorDto) => {
        this.loading = false
        this.formSent = true

        for (let fieldError of err.fieldErrors) {
          switch (fieldError.field) {
            case 'username':
              this.usernameErrors.push(fieldError.message)
              break
            case 'email':
              this.emailErrors.push(fieldError.message)
              break
            case 'country':
              this.countryErrors.push(fieldError.message)
              break
          }
        }
        this.notificationService.onErrorRequest(err)
      }
    })
  }

  updatePassword() {
    const request = new UserUpdateAccountDto();

    this.loading = true
    this.formSent = false
    this.userService.updateAccount(request).subscribe({
      next: () => {
        this.loading = false
        this.formSent = true
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

  onCountryChange(event?: Country) {
    if (!event || !event.name || !event.alpha2Code || !event.alpha3Code || !event.numericCode) {
      return;
    }
    this.currentCountry = event

    const country = new UserCountry();
    country.name = event.name;
    country.countryCode2Chars = event.alpha2Code;
    country.countryCode3Chars = event.alpha3Code;
    const numeric = parseInt(event.numericCode);
    if (!isNaN(numeric)) {
      country.code = numeric;
    } else {
      return;
    }

    this.country = country;
  }

}
