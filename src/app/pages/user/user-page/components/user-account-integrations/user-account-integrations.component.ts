import {Component, Input} from '@angular/core';
import {UserDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-user-account-integrations',
  templateUrl: './user-account-integrations.component.html',
  styleUrl: './user-account-integrations.component.scss'
})
export class UserAccountIntegrationsComponent {

  @Input() user?: UserDTO

}
