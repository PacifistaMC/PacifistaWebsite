import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    PacifistaNewsBanDTO,
    PacifistaNewsBanService,
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
    @Output() onCommentEditBtn = new EventEmitter<void>();

    private readonly commentService: PacifistaNewsCommentService;
    private readonly banService: PacifistaNewsBanService;

    private currentUser?: UserDTO

    protected showActions: boolean = false;

    protected ownComment: boolean = false;
    protected isUserStaff: boolean = false;
    protected loadingApi: boolean = false;


    constructor(httpClient: HttpClient,
                private notificationService: NotificationService) {
        this.commentService = new PacifistaNewsCommentService(httpClient, environment.production);
        this.banService = new PacifistaNewsBanService(httpClient, environment.production);
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
        if (!this.comment.id || (!this.ownComment && !this.isUserStaff)) return;

        this.loadingApi = true;
        this.commentService.deleteComment(this.comment.id).subscribe({
            next: () => {
                this.onCommentDeleted.emit();
                this.notificationService.info("Commentaire supprimé");
                this.loadingApi = false;
                this.showActions = false;
            },
            error: (error) => {
                this.notificationService.onErrorRequest(error);
                this.loadingApi = false;
                this.showActions = false;
            }
        });
    }

    banUser() {
        if (!this.isUserStaff) return;

        this.loadingApi = true;
        this.banService.create(new PacifistaNewsBanDTO(
            this.comment.funixProdUserId,
            this.comment.minecraftUsername
        )).subscribe({
            next: () => {
                this.notificationService.info("Utilisateur " + this.comment.minecraftUsername + " banni de l'espace commentaire");
                this.loadingApi = false;
                this.showActions = false;
            },
            error: (error) => {
                this.notificationService.onErrorRequest(error);
                this.loadingApi = false;
                this.showActions = false;
            }
        })
    }

    editComment() {
        if (!this.ownComment) return;
        this.onCommentEditBtn.emit();
        this.showActions = false;
    }

}
