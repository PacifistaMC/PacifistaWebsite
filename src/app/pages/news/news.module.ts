import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewsListPageComponent} from "./news-list-page/news-list-page.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {NewsPageComponent} from './news-page/news-page.component';
import {NewsRoutingModule} from "./news-routing.module";
import NewsService from "./NewsService";
import {NewsCommentsSectionComponent} from "./news-page/news-comments-section/news-comments-section.component";
import {MinecraftHeadComponent} from "../../components/minecraft-head/minecraft-head.component";
import {NewsCommentRowComponent} from "./news-page/news-comment-row/news-comment-row.component";
import {NewsReplyInputComponent} from "./news-page/news-reply-input/news-reply-input.component";
import {InputTextComponent} from "../../components/inputs/input-text/input-text.component";
import {SendButtonComponent} from "../../components/buttons/send-button/send-button.component";

@NgModule({
    declarations: [
        NewsListPageComponent,
        NewsCardComponent,
        NewsPageComponent,
        NewsCommentsSectionComponent,
        NewsCommentRowComponent,
        NewsReplyInputComponent
    ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        NgOptimizedImage,
        MinecraftHeadComponent,
        InputTextComponent,
        SendButtonComponent
    ],
    providers: [
        NewsService
    ],
    exports: [
        NewsCardComponent
    ]
})
export class NewsModule { }
