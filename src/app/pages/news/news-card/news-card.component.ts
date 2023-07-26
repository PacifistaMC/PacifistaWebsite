import {Component, Input} from '@angular/core';
import {faClock, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {

  protected readonly faUser = faUser;
  protected readonly faClock = faClock;
  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faComment = faComments;

  @Input() news: NewsDTO = new NewsDTO();

}
