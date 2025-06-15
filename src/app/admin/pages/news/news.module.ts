import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewsComponent} from "./news.component";
import {NewsRoutingModule} from "./news-routing.module";
import {MinecraftHeadComponent} from "../../../components/minecraft-head/minecraft-head.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {NgbdSearchableHeader, NgbdSortableHeader} from "../../../components/paginated/paginated.component";
import {NewsHandlerPageComponent} from "./news-handler-page/news-handler-page.component";
import {InputTextComponent} from "../../../components/inputs/input-text/input-text.component";
import {InputCheckboxComponent} from "../../../components/inputs/input-checkbox/input-checkbox.component";
import {InputFileComponent} from "../../../components/inputs/input-file/input-file.component";
import {FormsModule} from "@angular/forms";
import {SendButtonComponent} from "../../../components/buttons/send-button/send-button.component";
import {NewsBansListComponent} from "./news-bans-list/news-bans-list.component";
import {
    NewsBansConfirmDeleteComponent
} from "./news-bans-list/news-bans-confirm-delete/news-bans-confirm-delete.component";
import {MarkdownConverterComponent} from "../../../components/markdown-converter/markdown-converter.component";

@NgModule({
  declarations: [
    NewsComponent,
    NewsHandlerPageComponent,
    NewsBansListComponent,
    NewsBansConfirmDeleteComponent
  ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        MinecraftHeadComponent,
        NgbPagination,
        NgbdSearchableHeader,
        NgbdSortableHeader,
        InputTextComponent,
        InputCheckboxComponent,
        NgOptimizedImage,
        InputFileComponent,
        FormsModule,
        SendButtonComponent,
        MarkdownConverterComponent
    ]
})
export class NewsModule { }
