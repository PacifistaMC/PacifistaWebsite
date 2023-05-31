import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {UserDTO} from "../../services/funixproductions-api/users/dtos/UserDTO";
import UserService from "../../services/funixproductions-api/users/services/UserService";
import {isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user?: UserDTO;

  constructor(private userService: UserService,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.userService.currentUser().subscribe({
      next: value => {
        this.user = value;
      }}
    );
  }
}
