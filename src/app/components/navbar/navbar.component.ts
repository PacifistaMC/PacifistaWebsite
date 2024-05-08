import {Component} from '@angular/core';
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUrl: string;

  constructor(platformLocation: PlatformLocation) {
    this.currentUrl = platformLocation.pathname;
  }

}
