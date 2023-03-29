import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-wiki-page',
  templateUrl: './wiki-page.component.html',
  styleUrls: ['./wiki-page.component.scss']
})
export class WikiPageComponent {

  constructor(private titleService: Title) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("Wiki")) {
      titleService.setTitle('Wiki - ' + title);
    }
  }

}
