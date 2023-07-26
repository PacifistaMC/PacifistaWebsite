import {Component, OnInit} from '@angular/core';
import UserService from "../../../services/funixproductions-api/users/services/UserService";
import {Router} from "@angular/router";
import {UserDTO} from "../../../services/funixproductions-api/users/dtos/UserDTO";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  protected readonly faSearch = faSearch;

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
