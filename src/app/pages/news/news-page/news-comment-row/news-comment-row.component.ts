import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PacifistaNewsCommentDTO, PacifistaNewsCommentService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-news-comment-row',
    templateUrl: './news-comment-row.component.html',
    styleUrl: './news-comment-row.component.scss',
    standalone: false
})
export class NewsCommentRowComponent implements OnInit {

    @Input() comment!: PacifistaNewsCommentDTO;
    @Output() onCommentDeleted = new EventEmitter<void>();
    @Output() onCommentPosted = new EventEmitter<PacifistaNewsCommentDTO>();

    replies: PacifistaNewsCommentDTO[] = [];
    showReplies: boolean = false;
    showReplyInput: boolean = false;

    repliesTotal: number = 0;
    repliesLoaded: number = 0;
    page: number = 0;
    maxPages: number = 1;
    loadingReplies: boolean = false;

    hasLikedComment: boolean = false;
    loadingRequestLike: boolean = false;

    editComment: boolean = false;

    private readonly commentService: PacifistaNewsCommentService;

    constructor(httpClient: HttpClient,
                private readonly notificationService: NotificationService) {
        this.commentService = new PacifistaNewsCommentService(httpClient, environment.production);
    }

    ngOnInit(): void {
        this.hasLikedComment = this.comment.liked;
        this.repliesTotal = this.comment.replies;
    }

    likeActionComment() {
        if (this.loadingRequestLike || !this.comment.id) return;

        this.loadingRequestLike = true;

        if (this.hasLikedComment) {
            this.commentService.removeLikeFromComment(this.comment.id).subscribe({
                next: () => {
                    this.hasLikedComment = false;
                    this.comment.likes--;
                    this.loadingRequestLike = false;
                },
                error: (error) => {
                    this.notificationService.onErrorRequest(error);
                    this.loadingRequestLike = false;
                }
            });
        } else {
            this.commentService.likeComment(this.comment.id).subscribe({
                next: () => {
                    this.hasLikedComment = true;
                    this.comment.likes++;
                    this.loadingRequestLike = false;
                },
                error: (error) => {
                    this.notificationService.onErrorRequest(error);
                    this.loadingRequestLike = false;
                }
            });
        }
    }

    addNewReply(comment: PacifistaNewsCommentDTO) {
        this.showReplyInput = false;

        if (!this.comment.parent) {
            this.replies.push(comment);
            this.repliesTotal++;
        }

        this.onCommentPosted.emit(comment);
    }

    onShowReplies() {
        this.showReplies = !this.showReplies;

        if (this.showReplies && this.replies.length === 0) {
            this.loadReplies();
        }
    }

    pageUp() {
        if (this.loadingReplies || this.page >= this.maxPages) return;

        this.page++;
        this.loadReplies();
    }

    loadReplies() {
        if (this.loadingReplies && (this.comment.parent && this.comment.parent.parent) || !this.comment.id) return;

        this.loadingReplies = true;
        this.commentService.getRepliesByCommentId(this.comment.id, this.page).subscribe({
            next: (response) => {
                this.repliesTotal = response.totalElementsDatabase;
                this.repliesLoaded += response.totalElementsThisPage;
                this.maxPages = response.totalPages;
                this.replies.push(...response.content);

                this.loadingReplies = false;
            },
            error: (error) => {
                this.notificationService.onErrorRequest(error);
                this.loadingReplies = false;
            }
        });
    }

    updateCommentDone(comment: PacifistaNewsCommentDTO) {
        this.comment = comment;
        this.editComment = false;
    }

}
