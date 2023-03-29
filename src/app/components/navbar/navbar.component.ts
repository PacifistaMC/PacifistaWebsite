import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../../services/funix-api/users/dtos/UserDTO";
import UserService from "../../services/funix-api/users/services/UserService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user?: UserDTO;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.currentUser().subscribe({
      next: value => {
        this.user = value;
      }}
    );
  }
}
