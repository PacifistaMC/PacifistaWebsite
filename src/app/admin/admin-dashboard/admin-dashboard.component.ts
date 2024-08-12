import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {UserJwtCheckerService, UserRole} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

    constructor(router: Router,
                @Inject(PLATFORM_ID) platformId: Object) {
        if (!isPlatformBrowser(platformId)) {
            router.navigate(["/"])
            return;
        }

        const jwtService = new UserJwtCheckerService();
        const user = jwtService.getUser()

        if (user == null) {
            router.navigate(["/"])
        } else if (!(user.role == UserRole.PACIFISTA_ADMIN ||
            user.role == UserRole.PACIFISTA_MODERATOR ||
            user.role == UserRole.ADMIN)) {
            router.navigate(["/"])
        }
    }

}
