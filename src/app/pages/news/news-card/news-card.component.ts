import {Component, Input} from '@angular/core';
import {faClock, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {PacifistaNewsDTO} from "@funixproductions/funixproductions-requests";

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

  @Input() news: PacifistaNewsDTO = new PacifistaNewsDTO();

}
