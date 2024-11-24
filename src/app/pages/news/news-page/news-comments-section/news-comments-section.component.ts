import {Component, Input, OnInit} from '@angular/core';
import {
  PacifistaNewsCommentDTO,
  PacifistaNewsCommentService,
  PacifistaNewsDTO
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-news-comments-section',
  templateUrl: './news-comments-section.component.html',
  styleUrl: './news-comments-section.component.scss'
})
export class NewsCommentsSectionComponent implements OnInit {

  @Input() news!: PacifistaNewsDTO;

  totalComments: number = 0;
  commentsLoaded: number = 0;
  comments: PacifistaNewsCommentDTO[] = [];
  page: number = 0;
  maxPages: number = 1;

  initialLoadingComments: boolean = true;
  loadingComments: boolean = true;

  private readonly commentsService: PacifistaNewsCommentService;

  constructor(httpClient: HttpClient,
              private readonly notificationService: NotificationService) {
    this.commentsService = new PacifistaNewsCommentService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.loadComments();
  }

  onCommentDeleted(comment: PacifistaNewsCommentDTO): void {
    let index = -1;
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id === comment.id) {
        index = i;
        break;
      }
    }

    this.totalComments--;
    if (index === -1) return;
    this.comments.splice(index, 1);
  }

  onCommentPosted(comment: PacifistaNewsCommentDTO): void {
    this.comments.unshift(comment);
    this.totalComments++;
  }

  pageUp(): void {
    if (this.page >= this.maxPages) return;

    this.page++;
    this.loadComments();
  }

  private loadComments(): void {
    if (!this.news.id) return;

    this.loadingComments = true;
    this.commentsService.getCommentsByNewsId(this.news.id, this.page, false).subscribe({
      next: (comments) => {
        this.totalComments = comments.totalElementsDatabase;
        this.maxPages = comments.totalPages;
        this.commentsLoaded += comments.totalElementsThisPage
        this.comments.push(...comments.content);

        this.loadingComments = false;
        this.initialLoadingComments = false;
      },
      error: (error) => {
        this.notificationService.onErrorRequest(error);
        this.loadingComments = false;
        this.initialLoadingComments = false;
      }
    });
  }

}
