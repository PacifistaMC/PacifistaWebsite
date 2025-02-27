import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, PlatformLocation} from "@angular/common";
import {UserJwtCheckerService, UserRole} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {

  currentUrl: string;

  constructor(platformLocation: PlatformLocation,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.currentUrl = platformLocation.pathname;
  }

  isCurrentUserStaff(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const jwtService = new UserJwtCheckerService();
    const user = jwtService.getUser()

    if (user == null) {
      return false;
    } else {
      return user.role == UserRole.PACIFISTA_ADMIN ||
          user.role == UserRole.PACIFISTA_MODERATOR ||
          user.role == UserRole.ADMIN
    }
  }

}
