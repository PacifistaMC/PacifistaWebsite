import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Title} from "@angular/platform-browser";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {
    PacifistaNewsDTO,
    PacifistaNewsService,
    PageOption,
    QueryBuilder
} from "@funixproductions/funixproductions-requests";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent extends PacifistaPage {

  protected override title: string = 'News';
  protected override canonicalPath: string = 'news'
  protected override pageDescription: string = 'Toutes les news de Pacifista, events, mises à jour et annonces. Le serveur Minecraft français survie créatif !';

  protected newsList: PacifistaNewsDTO[] = [];
  protected pageOption: PageOption = new PageOption();
  protected queryBuilder: QueryBuilder = new QueryBuilder();
  protected totalNews: number = 0;
  protected loading: boolean = true;

  private newsService: PacifistaNewsService;

  constructor(private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platfomId: Object,
              titleService: Title,
              @Inject(DOCUMENT) doc: Document,
              httpClient: HttpClient) {
    super(titleService, doc);
    this.newsService = new PacifistaNewsService(httpClient, environment.production);

    this.pageOption.elemsPerPage = 10;
    this.pageOption.page = 0;
    this.pageOption.sort = 'createdAt:desc';
  }


  protected override onPageInit() {
    this.loadNews();
  }

  pageUpNews(): void {
    if (!this.loading) {
      this.loadNews(this.pageOption.page + 1);
    }
  }

  private loadNews(page: number = 0): void {
    this.loading = true;
    this.pageOption.page = page;

    this.newsService.find(this.pageOption, this.queryBuilder).subscribe({
      next: (newsList) => {
        this.totalNews = newsList.totalElementsDatabase;
        this.newsList.push(...newsList.content);
      },
      error: (err) => {
        this.notificationService.onErrorRequest(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
