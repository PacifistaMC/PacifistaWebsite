import {Component, Input} from '@angular/core';
import {UserDTO,} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-user-account-infos',
    templateUrl: './user-account-infos.component.html',
    styleUrl: './user-account-infos.component.scss',
    standalone: false
})
export class UserAccountInfosComponent {

  @Input() user?: UserDTO

}
