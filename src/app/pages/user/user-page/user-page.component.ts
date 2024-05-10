import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {FunixprodHttpClient, UserAuthService, UserDTO} from "@funixproductions/funixproductions-requests";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import NotificationService from "../../../services/notifications/services/NotificationService";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends PacifistaPage {

  protected override title: string = 'Profil';
  protected override canonicalPath: string = 'user';
  protected override pageDescription: string = 'Page de profil utilisateur.';

  private readonly authService: UserAuthService;
  user?: UserDTO;
  loadingLogOut: boolean = false

  constructor(private router: Router,
              private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platfomId: Object,
              title: Title,
              @Inject(DOCUMENT) doc: Document,
              httpClient: HttpClient) {
    super(title, doc);
    this.authService = new UserAuthService(httpClient, environment.production);
  }

  protected override onPageInit() {
    if (!isPlatformBrowser(this.platfomId)) return;

    this.authService.currentUser().subscribe({
      next: value => {
        this.user = value;
      },
      error: () => {
        this.router.navigate(['user', 'login']);
      }
    })
  }

  logOut() {
    this.loadingLogOut = true

    this.authService.logout().subscribe({
      next: () => {
        this.loadingLogOut = false
        localStorage.removeItem(FunixprodHttpClient.accessTokenLocalStorageName)
        this.router.navigate(['user', 'login']);
      },
      error: err => {
        this.loadingLogOut = false
        this.notificationService.onErrorRequest(err)
      }
    })
  }

}
