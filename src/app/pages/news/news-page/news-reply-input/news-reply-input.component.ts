import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ErrorDto,
  PacifistaNewsCommentDTO,
  PacifistaNewsCommentService,
  PacifistaNewsDTO,
  PacifistaWebUserLinkService
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-news-reply-input',
  templateUrl: './news-reply-input.component.html',
  styleUrl: './news-reply-input.component.scss'
})
export class NewsReplyInputComponent implements AfterViewInit {

  @Input() news!: PacifistaNewsDTO;
  @Input() parentComment?: PacifistaNewsCommentDTO;
  @Input() editComment?: PacifistaNewsCommentDTO;
  @Output() onRequestDone = new EventEmitter<PacifistaNewsCommentDTO>();

  content: string = '';
  contentErrors: string[] = [];

  loading: boolean = false;
  formSent: boolean = false;

  loggedUserMinecraftName: string = '';

  private readonly commentsService: PacifistaNewsCommentService;

  constructor(private readonly httpClient: HttpClient,
              private readonly notificationService: NotificationService) {
    this.commentsService = new PacifistaNewsCommentService(httpClient, environment.production);
  }

  ngAfterViewInit(): void {
    new PacifistaWebUserLinkService(this.httpClient, environment.production).getCurrentUserLink().subscribe({
        next: (userLink) => {
            this.loggedUserMinecraftName = userLink.minecraftUsername ?? '';
        }
    });

    if (this.editComment) {
      this.content = this.editComment.content;
    }

    if (this.parentComment && this.parentComment.parent) {
      this.content = `@${this.parentComment.minecraftUsername} `;
      this.parentComment = this.parentComment.parent;
    }
  }

  sendRequest(): void {
    if (this.loading) return;

    if (this.content.length === 0) {
      this.contentErrors = ['Le commentaire ne peut pas être vide.'];
      this.loading = false;
      this.formSent = true;
      return;
    }

    this.loading = true;
    this.formSent = false;
    this.contentErrors = [];

    if (this.editComment) {
      if (!this.editComment.id) {
        this.loading = false;
        this.formSent = true;
        this.notificationService.error('Impossible de modifier le commentaire. Le commentaire n\'a pas d\'identifiant.');
        return;
      }

      this.commentsService.updateComment(this.editComment.id, this.content).subscribe({
        next: (comment) => {
          this.loading = false;
          this.formSent = true;
          this.onRequestDone.emit(comment);
        },
        error: (error: ErrorDto) => {
          this.parseErrors(error);
        }
      })
    } else {
      this.commentsService.createComment(new PacifistaNewsCommentDTO(
          this.news,
          this.content,
          this.parentComment
      )).subscribe({
        next: (comment) => {
          this.loading = false;
          this.formSent = true;
          this.content = '';
          this.onRequestDone.emit(comment);
        },
        error: (error: ErrorDto) => {
          this.parseErrors(error);
        }
      })
    }
  }

  private parseErrors(error: ErrorDto): void {
    this.notificationService.onErrorRequest(error);

    error.fieldErrors.forEach((fieldError) => {
        if (fieldError.field === 'content') {
            this.contentErrors.push(fieldError.message);
        }
    });

    this.loading = false;
    this.formSent = true;
  }

}
