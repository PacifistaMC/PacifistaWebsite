import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {DomSanitizer, SafeHtml, Title} from "@angular/platform-browser";
import {ErrorDto, PacifistaNewsDTO, PacifistaNewsService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DOCUMENT} from "@angular/common";
import NewsService from "../NewsService";

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.scss'],
    standalone: false
})
export class NewsPageComponent extends PacifistaPage {

    protected override title: string = 'News';
    protected override canonicalPath: string = 'news';
    protected override pageDescription: string = 'Découvrez la news de Pacifista !';

    private readonly newsService: PacifistaNewsService;

    protected news?: PacifistaNewsDTO;
    protected newsHtmlContent: SafeHtml = '';
    protected newsImageFullQualityUrl: string = '';
    protected likedNews: boolean = false;
    protected likedNewsLoading: boolean = false;

    constructor(private notificationService: NotificationService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer,
                httpClient: HttpClient,
                titleService: Title,
                @Inject(DOCUMENT) doc: Document) {
        super(titleService, doc);
        this.newsService = new PacifistaNewsService(httpClient, environment.production);
    }

    protected override onPageInit(callback: () => void): void {
        this.activatedRoute.params.subscribe(params => {
            const newsName = params['newsName'];
            if (!newsName) {
                this.notificationService.error('La news n\'a pas été trouvée.');
                this.router.navigate(['/news']);
                return;
            }

            this.newsService.getNewsByName(newsName).subscribe({
                next: (news) => {
                    this.news = news;

                    this.title = 'News - ' + this.news.name;
                    this.canonicalPath = 'news/' + this.news.name;
                    this.pageDescription = this.news.subtitle;
                    this.pageImage = NewsService.getImageUrl(this.news, true);
                    this.newsImageFullQualityUrl = NewsService.getImageUrl(this.news);
                    this.newsHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.news.bodyHtml);
                    this.likedNews = this.news.liked;
                    callback();
                },
                error: (error) => {
                    this.notificationService.onErrorRequest(error);
                    callback();
                }
            });
        });
    }

    likeActionNews() {
        if (!this.news || !this.news.id) return;

        this.likedNewsLoading = true;
        if (this.likedNews) {
            this.newsService.removeLikeFromNews(this.news.id).subscribe({
                next: () => {
                    this.likedNews = false;
                    this.news!.likes--;

                    if (this.news!.likes < 0) {
                        this.news!.likes = 0;
                    }
                    this.likedNewsLoading = false;
                },
                error: (error: ErrorDto) => {
                    this.notificationService.onErrorRequest(error);
                    this.likedNewsLoading = false;
                }
            });
        } else {
            this.newsService.likeNews(this.news.id).subscribe({
                next: () => {
                    this.likedNews = true;
                    this.news!.likes++;

                    this.likedNewsLoading = false;
                },
                error: (error: ErrorDto) => {
                    this.notificationService.onErrorRequest(error);
                    this.likedNewsLoading = false;
                }
            });
        }
    }
}
