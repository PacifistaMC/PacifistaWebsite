import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PacifistaNewsCommentDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-news-reply-input',
  templateUrl: './news-reply-input.component.html',
  styleUrl: './news-reply-input.component.scss'
})
export class NewsReplyInputComponent {

  @Input() comment?: PacifistaNewsCommentDTO;
  @Output() onCommentPosted = new EventEmitter<PacifistaNewsCommentDTO>();

}
