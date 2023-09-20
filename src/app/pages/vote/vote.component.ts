import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  constructor(private titleService: Title) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("Voter")) {
      titleService.setTitle('Voter - ' + title);
    }
  }

}
