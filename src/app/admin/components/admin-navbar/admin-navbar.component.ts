import {Component} from '@angular/core';
import {UserJwtCheckerService, UserRole} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrl: './admin-navbar.component.scss',
    standalone: false
})
export class AdminNavbarComponent {

    readonly userRole: UserRole

    constructor() {
        const current = new UserJwtCheckerService().getUser()

        if (current == null) {
            this.userRole = UserRole.USER
        } else {
            this.userRole = current.role
        }
    }

    protected readonly UserRole = UserRole;
}
