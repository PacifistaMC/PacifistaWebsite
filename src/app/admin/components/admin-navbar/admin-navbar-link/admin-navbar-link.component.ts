import {Component, Input} from '@angular/core';

@Component({
  selector: 'admin-navbar-link',
  templateUrl: './admin-navbar-link.component.html',
  styleUrl: './admin-navbar-link.component.scss'
})
export class AdminNavbarLinkComponent {

  @Input() label: string = "";
  @Input() pathUrl: string = ""
  @Input() icon: string = ""

}
