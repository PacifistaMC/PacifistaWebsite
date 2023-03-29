import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private titleService: Title) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("A propos")) {
      titleService.setTitle('A propos - ' + title);
    }
  }

}
