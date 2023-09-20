import {Component, Inject, PLATFORM_ID, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {UserAuthService, UserDTO} from "@funixproductions/funixproductions-requests";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends PacifistaPage {

  protected override title: string = 'Profil';
  protected override canonicalPath: string = 'user';
  protected override pageDescription: string = 'Page de profil utilisateur.';

  protected readonly faSearch = faSearch;

  private readonly authService: UserAuthService;
  user?: UserDTO;

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platfomId: Object,
              title: Title,
              renderer: Renderer2,
              httpClient: HttpClient) {
    super(title, renderer);
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

}
