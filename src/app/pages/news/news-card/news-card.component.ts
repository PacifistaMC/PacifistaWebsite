import {Component, Input} from '@angular/core';
import {PacifistaNewsDTO} from "@funixproductions/funixproductions-requests";
import NewsService from "../NewsService";

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrls: ['./news-card.component.scss'],
    standalone: false
})
export class NewsCardComponent {

  @Input() news!: PacifistaNewsDTO;

  getArticleImageUrl(): string {
    return NewsService.getImageUrl(this.news, true);
  }

}
