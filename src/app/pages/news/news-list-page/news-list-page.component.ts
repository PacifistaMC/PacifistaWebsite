import {Component, Inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {PacifistaNewsDTO, PacifistaNewsService} from "@funixproductions/funixproductions-requests";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-news-list-page',
    templateUrl: './news-list-page.component.html',
    styleUrls: ['./news-list-page.component.scss'],
    standalone: false
})
export class NewsListPageComponent extends PacifistaPage {

  protected override title: string = 'News';
  protected override canonicalPath: string = 'news'
  protected override pageDescription: string = 'Pacifista : Découvrez toutes les news du serveur Minecraft !';

  protected newsList: PacifistaNewsDTO[] = [];

  protected totalNews: number = 0;
  protected page: number = 0;
  protected maxPages: number = 1;
  protected loading: boolean = false;

  private readonly newsService: PacifistaNewsService;

  constructor(private notificationService: NotificationService,
              titleService: Title,
              @Inject(DOCUMENT) doc: Document,
              httpClient: HttpClient) {
    super(titleService, doc);
    this.newsService = new PacifistaNewsService(httpClient, environment.production);
  }

  protected override onPageInit() {
    this.loadNews();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.pageUpNews();
    }
  }

  private pageUpNews(): void {
    if (!this.loading && this.page < this.maxPages) {
      this.page++;
      this.loadNews();
    }
  }

  private loadNews(): void {
    this.loading = true;

    this.newsService.getAllNews(this.page).subscribe({
      next: (newsList) => {
        this.newsList.push(...newsList.content);
        this.totalNews = newsList.totalElementsDatabase;
        this.maxPages = newsList.totalPages;
        this.loading = false;
      },
      error: (err) => {
        this.notificationService.onErrorRequest(err);
        this.loading = false;
      },
    });
  }

}
