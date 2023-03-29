import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent {

  constructor(private titleService: Title) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("Voter")) {
      titleService.setTitle('Voter - ' + title);
    }
  }

}
