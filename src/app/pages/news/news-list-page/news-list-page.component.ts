import {AfterViewInit, Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";
import NewsService from "../../../services/pacifista-api/news/services/NewsService";
import {PageOption} from "../../../services/core/http/dtos/PaginatedDTO";

@Component({
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent implements AfterViewInit {

  protected readonly twitter = faTwitter;

  protected newsList: NewsDTO[] = [];
  protected pageOption: PageOption = new PageOption();
  protected totalNews: number = 0;

  constructor(private titleService: Title,
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



  private loadNews(page: number = 0): void {
    this.pageOption.page = page;

    this.newsService.find(this.pageOption, null).subscribe(newsList => {
      this.totalNews = newsList.totalElementsDatabase;
      this.newsList.push(...newsList.content);
    });
  }

}
