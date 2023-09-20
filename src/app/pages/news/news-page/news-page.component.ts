import {Component, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {
  PacifistaNewsDTO,
  PacifistaNewsService,
  PageOption,
  QueryBuilder,
  QueryParam
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent extends PacifistaPage {

  protected override title: string = 'News';
  protected override canonicalPath: string = 'news';
  protected override pageDescription: string = 'Découvrez la news de Pacifista !';

  protected news?: PacifistaNewsDTO;
  protected readonly newsService: PacifistaNewsService;

  constructor(private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              httpClient: HttpClient,
              titleService: Title,
              renderer: Renderer2) {
    super(titleService, renderer);
    this.newsService = new PacifistaNewsService(httpClient, environment.production);

    this.activatedRoute.params.subscribe(params => {
      const newsName = params['newsName'];

      if (newsName) {
        const queryBuilder = new QueryBuilder();
        const query = new QueryParam();
        query.key = 'name';
        query.value = newsName;
        queryBuilder.addParam(query);

        this.newsService.find(new PageOption(), queryBuilder).subscribe({
          next: (news) => {
            if (news.content.length > 0) {
              this.news = news.content[0];

              this.title = 'News - ' + this.news.name;
              this.canonicalPath = 'news/' + this.news.name;
              this.pageDescription = this.news.subtitle || this.pageDescription;
              this.pageImage = this.news.articleImageUrl || this.pageImage;
            } else {
              this.notificationService.error("La news n'existe pas.");
            }
          },
          error: (error) => {
            this.notificationService.onErrorRequest(error, 'Impossible de charger la news');
          }
        });
      }
    });
  }

}
