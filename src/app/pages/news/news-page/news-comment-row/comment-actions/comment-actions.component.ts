import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    PacifistaNewsCommentDTO,
    PacifistaNewsCommentService,
    UserDTO,
    UserJwtCheckerService,
    UserRole
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import NotificationService from "../../../../../services/notifications/services/NotificationService";

@Component({
    selector: 'app-comment-actions',
    templateUrl: './comment-actions.component.html',
    styleUrl: './comment-actions.component.scss'
})
export class CommentActionsComponent implements OnInit {

    @Input() comment!: PacifistaNewsCommentDTO;
    @Output() onCommentDeleted = new EventEmitter<void>();

    private readonly commentService: PacifistaNewsCommentService;

    private currentUser?: UserDTO
    protected ownComment: boolean = false;
    protected isUserStaff: boolean = false;

    constructor(httpClient: HttpClient,
                private notificationService: NotificationService) {
        this.commentService = new PacifistaNewsCommentService(httpClient, environment.production);
    }

    ngOnInit(): void {
        let user = new UserJwtCheckerService().getUser();

        if (user) {
            this.currentUser = user;
            this.ownComment = this.currentUser.id === this.comment.funixProdUserId;
            this.isUserStaff = user.role !== UserRole.USER;
        }
    }

    deleteComment() {
        if (!this.comment.id || !this.ownComment || !this.isUserStaff) return;

        this.commentService.deleteComment(this.comment.id).subscribe({
            next: () => {
                this.onCommentDeleted.emit();
            },
            error: (error) => {
                this.notificationService.onErrorRequest(error);
            }
        });
    }

}
