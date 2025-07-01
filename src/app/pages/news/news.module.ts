import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewsListPageComponent} from "./news-list-page/news-list-page.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {NewsPageComponent} from './news-page/news-page.component';
import {NewsRoutingModule} from "./news-routing.module";
import NewsService from "./news-service";
import {NewsCommentsSectionComponent} from "./news-page/news-comments-section/news-comments-section.component";
import {MinecraftHeadComponent} from "../../components/minecraft-head/minecraft-head.component";
import {NewsCommentRowComponent} from "./news-page/news-comment-row/news-comment-row.component";
import {NewsReplyInputComponent} from "./news-page/news-reply-input/news-reply-input.component";
import {InputTextComponent} from "../../components/inputs/input-text/input-text.component";
import {SendButtonComponent} from "../../components/buttons/send-button/send-button.component";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {CommentActionsComponent} from "./news-page/news-comment-row/comment-actions/comment-actions.component";
import {StaffBadgeComponent} from "../../components/staff-badge/staff-badge.component";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha-2";
import {environment} from "../../../environments/environment";

@NgModule({
    declarations: [
        NewsListPageComponent,
        NewsCardComponent,
        NewsPageComponent,
        NewsCommentsSectionComponent,
        NewsCommentRowComponent,
        NewsReplyInputComponent,
        CommentActionsComponent
    ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        NgOptimizedImage,
        MinecraftHeadComponent,
        RecaptchaV3Module,
        InputTextComponent,
        SendButtonComponent,
        SpinnerComponent,
        StaffBadgeComponent
    ],
    providers: [
        NewsService,
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.reCaptchaSiteKey,
        },
    ],
    exports: [
        NewsCardComponent
    ]
})
export class NewsModule { }
