import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {UserAuthService, UserCountry, UserCreationDTO} from "@funixproductions/funixproductions-requests";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {DOCUMENT} from "@angular/common";
import {Country} from "@angular-material-extensions/select-country";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent extends PacifistaPage {

  protected override title: string = 'Inscription';
  protected override canonicalPath: string = 'user/register';
  protected override pageDescription: string = 'Inscription sur le site de Pacifista. Page de création de compte.';

  username: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  acceptCgu: boolean = false;
  acceptCgv: boolean = false;
  country?: UserCountry;

  private readonly userAuthService: UserAuthService;

  constructor(private reCaptchaService: ReCaptchaV3Service,
              private router: Router,
              private notificationService: NotificationService,
              titleService: Title,
              @Inject(DOCUMENT) doc: Document,
              httpClient: HttpClient) {
    super(titleService, doc);
    this.userAuthService = new UserAuthService(httpClient, environment.production);
  }

  register(): void {
    if (!this.country) {
        this.notificationService.error('Veuillez sélectionner un pays.');
        return;
    }

    const userCreationRequest: UserCreationDTO = new UserCreationDTO();
    userCreationRequest.email = this.email;
    userCreationRequest.username = this.username;
    userCreationRequest.password = this.password;
    userCreationRequest.passwordConfirmation = this.passwordConfirmation;
    userCreationRequest.acceptCGU = this.acceptCgu;
    userCreationRequest.acceptCGV = this.acceptCgv;
    userCreationRequest.country = this.country;

    this.reCaptchaService.execute('register').subscribe((token: string) => {
      this.userAuthService.register(userCreationRequest, token).subscribe({
          next: () => {
            this.router.navigate(['user', 'login']);
          },
          error: err => {
            this.notificationService.onErrorRequest(err, 'Erreur lors de la création de compte.');
          }
        }
      )
    });
  }

  onCountryChange(event?: Country) {
    if (!event || !event.name || !event.alpha2Code || !event.alpha3Code || !event.numericCode) {
      return;
    }

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
