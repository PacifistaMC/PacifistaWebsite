import {Component, Input} from '@angular/core';
import {UserDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-user-account-invoices',
  templateUrl: './user-account-invoices.component.html',
  styleUrl: './user-account-invoices.component.scss'
})
export class UserAccountInvoicesComponent {

  @Input() user: UserDTO = new UserDTO()

}
