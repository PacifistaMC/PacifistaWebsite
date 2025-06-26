import {Component, DOCUMENT, Inject, PLATFORM_ID} from '@angular/core';
import {Title} from "@angular/platform-browser";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {PacifistaNewsDTO, PacifistaNewsService} from "@funixproductions/funixproductions-requests";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-news-list-page',
    templateUrl: './news-list-page.component.html',
    styleUrls: ['./news-list-page.component.scss'],
    standalone: false
})
export class NewsListPageComponent extends PacifistaPage {

  private readonly window?: (WindowProxy & typeof globalThis) | null;
  protected override title: string = 'News';
  protected override canonicalPath: string = 'news'
  protected override pageDescription: string = 'Suivez toutes les news de Pacifista : mises à jour, événements spéciaux et annonces officielles de notre serveur Minecraft PvE. Ne manquez rien !';

  protected newsList: PacifistaNewsDTO[] = [];

  protected totalNews: number = 0;
  protected page: number = 0;
  protected maxPages: number = 1;
  protected loading: boolean = false;

  private readonly newsService: PacifistaNewsService;

  constructor(private readonly notificationService: NotificationService,
              titleService: Title,
              @Inject(DOCUMENT) doc: Document,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              httpClient: HttpClient) {
    super(titleService, doc);
    this.newsService = new PacifistaNewsService(httpClient, environment.production);
    if (isPlatformBrowser(this.platformId)) {
      this.window = doc.defaultView
    }
  }

  protected override onPageInit() {
    this.loadNews();

    if (isPlatformBrowser(this.platformId)) {
      window?.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll() {
    if (this.window && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
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
