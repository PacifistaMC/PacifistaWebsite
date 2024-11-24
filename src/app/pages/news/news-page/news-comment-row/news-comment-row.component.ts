import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PacifistaNewsCommentDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-news-comment-row',
  templateUrl: './news-comment-row.component.html',
  styleUrl: './news-comment-row.component.scss'
})
export class NewsCommentRowComponent {

  @Input() comment!: PacifistaNewsCommentDTO;
  @Output() onCommentDeleted = new EventEmitter<void>();
  @Output() onCommentPosted = new EventEmitter<PacifistaNewsCommentDTO>();

  replies: PacifistaNewsCommentDTO[] = [];
  showReplies: boolean = false;
  showFullText: boolean = false;
  showReplyInput: boolean = false;

  repliesTotal: number = 0;
  repliesLoaded: number = 0;
  page: number = 0;
  maxPages: number = 1;

  hasLikedComment: boolean = false;
  loadingRequestLike: boolean = false;

  likeActionComment() {
    if (this.loadingRequestLike) return;
  }

  addNewReply(comment: PacifistaNewsCommentDTO) {

  }

}
