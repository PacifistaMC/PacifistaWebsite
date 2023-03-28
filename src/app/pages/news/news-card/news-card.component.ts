import {Component, Input} from '@angular/core';
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {

  @Input() news: NewsDTO = new NewsDTO();

}
