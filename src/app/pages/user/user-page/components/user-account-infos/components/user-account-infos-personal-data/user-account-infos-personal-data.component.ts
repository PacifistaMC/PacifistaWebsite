import {AfterViewInit, Component, Input} from '@angular/core';
import {
    ErrorDto,
    UserAuthService,
    UserCountry,
    UserDTO,
    UserUpdateAccountDto
} from "@funixproductions/funixproductions-requests";
import {Country} from "@angular-material-extensions/select-country";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../../../../environments/environment";

@Component({
  selector: 'app-user-account-infos-personal-data',
  templateUrl: './user-account-infos-personal-data.component.html',
  styleUrl: './user-account-infos-personal-data.component.scss'
})
export class UserAccountInfosPersonalDataComponent implements AfterViewInit {

  @Input() user?: UserDTO
  private readonly userService: UserAuthService

  username: string = ''
  usernameErrors: string[] = []

  email: string = ''
  emailErrors: string[] = []

  country?: UserCountry
  currentCountry?: Country
  countryErrors: string[] = []

  formSent: boolean = false
  loading: boolean = false

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.userService = new UserAuthService(httpClient, environment.production)
  }

  ngAfterViewInit(): void {
    this.username = this.user?.username ?? ''
    this.email = this.user?.email ?? ''
    this.country = this.user?.country ?? new UserCountry()

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
    this.loading = true
    this.formSent = false
    this.usernameErrors = []
    this.emailErrors = []
    this.countryErrors = []

    const request = new UserUpdateAccountDto();

    request.username = this.username
    request.email = this.email
    request.country = this.country

    this.userService.updateAccount(request).subscribe({
      next: user => {
        this.loading = false
        this.formSent = true

        this.username = user.username
        this.email = user.email
        this.country = user.country
        this.notificationService.info("Vos informations de compte ont été mises à jour avec succès.")
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
