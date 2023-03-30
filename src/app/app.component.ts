import { Component } from '@angular/core';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCartArrowDown, faClock, faComment, faThumbsUp, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pacifista-website';

  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(
      faComment,
      faThumbsUp,
      faUser,
      faClock,
      faCartArrowDown
    );
  }
}
