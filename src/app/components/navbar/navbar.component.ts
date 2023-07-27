import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import UserService from "../../services/funixproductions-api/users/services/UserService";
import {isPlatformServer} from "@angular/common";
import FunixProdHttpClient from "../../services/core/services/FunixProdHttpClient";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: boolean = false;

  constructor(private userService: UserService,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.user = localStorage.getItem(FunixProdHttpClient.LOCAL_STORAGE_KEY_AUTH) !== null;
  }
}
