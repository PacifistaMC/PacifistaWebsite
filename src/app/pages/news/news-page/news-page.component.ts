import {Component} from '@angular/core';
import NewsService from "../../../services/pacifista-api/news/services/NewsService";
import {ActivatedRoute, Router} from "@angular/router";
import NotificationService from "../../../services/core/notifications/services/NotificationService";
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";
import {QueryBuilder, QueryParam} from "../../../services/core/http/utils/QueryBuilder";
import {PageOption} from "../../../services/core/http/dtos/PaginatedDTO";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent {

  protected loading: boolean = true;
  protected news?: NewsDTO;

  constructor(private newsService: NewsService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      const newsName = params['newsName'];

      if (newsName) {
        const queryBuilder = new QueryBuilder();
        const query = new QueryParam();
        query.key = 'name';
        query.value = newsName;
        queryBuilder.addParam(query);

        this.newsService.find(new PageOption(), queryBuilder).subscribe(news => {
          if (news.content.length > 0) {
            this.news = news.content[0];
          }
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }

}
