import {Component, Input} from '@angular/core';
import {PacifistaNewsDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {

  @Input() news: PacifistaNewsDTO = new PacifistaNewsDTO();

}
