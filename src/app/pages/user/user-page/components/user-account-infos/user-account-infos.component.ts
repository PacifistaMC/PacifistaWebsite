import {AfterViewInit, Component, Input} from '@angular/core';
import {UserAuthService, UserCountry, UserDTO} from "@funixproductions/funixproductions-requests";
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
