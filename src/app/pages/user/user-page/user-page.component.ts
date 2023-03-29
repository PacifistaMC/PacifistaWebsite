import {Component, OnInit} from '@angular/core';
import UserService from "../../../services/funix-api/users/services/UserService";
import {Router} from "@angular/router";
import {UserDTO} from "../../../services/funix-api/users/dtos/UserDTO";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user?: UserDTO;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.currentUser().subscribe({
      next: value => {
        this.user = value;
      },
      error: () => {
        this.router.navigate(['user', 'login']);
      }
    })
  }

}
