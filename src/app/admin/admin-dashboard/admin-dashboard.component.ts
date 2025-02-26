import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {UserJwtCheckerService, UserRole} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    standalone: false
})
export class AdminDashboardComponent implements OnInit {

    constructor(private router: Router,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            this.router.navigate(["/"])
            return;
        }

        const jwtService = new UserJwtCheckerService();
        const user = jwtService.getUser()

        if (user == null) {
            this.router.navigate(["/"])
        } else if (!(user.role == UserRole.PACIFISTA_ADMIN ||
            user.role == UserRole.PACIFISTA_MODERATOR ||
            user.role == UserRole.ADMIN)) {
            this.router.navigate(["/"])
        }
    }



}
