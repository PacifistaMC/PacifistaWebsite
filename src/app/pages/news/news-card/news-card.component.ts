import {Component, Input} from '@angular/core';
import {PacifistaNewsDTO} from "@funixproductions/funixproductions-requests";
import NewsService from "../news-service";

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrls: ['./news-card.component.scss'],
    standalone: false
})
export class NewsCardComponent {

  @Input() news!: PacifistaNewsDTO;

  newsCategoryName: string = 'Mise à jour';
  newsCategoryColor: string = '#20c85b'

  getArticleImageUrl(): string {
    return NewsService.getImageUrl(this.news, true);
  }

}
