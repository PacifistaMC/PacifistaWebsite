import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent {

  constructor(private titleService: Title) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("News")) {
      titleService.setTitle('News - ' + title);
    }  }

}
