import {AfterViewInit, Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";
import NewsService from "../../../services/pacifista-api/news/services/NewsService";
import {PageOption} from "../../../services/core/http/dtos/PaginatedDTO";
import NotificationService from "../../../services/core/notifications/services/NotificationService";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent implements AfterViewInit {

  protected readonly twitter = faTwitter;
  protected readonly loadingIcon = faSpinner;

  protected newsList: NewsDTO[] = [];
  protected pageOption: PageOption = new PageOption();
  protected totalNews: number = 0;
  protected loading: boolean = true;

  constructor(private titleService: Title,
              private notificationService: NotificationService,
              private newsService: NewsService) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("News")) {
      titleService.setTitle('News - ' + title);
    }

    this.pageOption.elemsPerPage = 10;
    this.pageOption.page = 0;
    this.pageOption.sort = 'createdAt:desc';
  }

  ngAfterViewInit(): void {
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

    this.newsService.find(this.pageOption, null).subscribe({
      next: (newsList) => {
        this.totalNews = newsList.totalElementsDatabase;
        this.newsList.push(...newsList.content);
      },
      error: (err) => {
        this.notificationService.onErrorRequest(err, 'Erreur lors du chargement des news');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
