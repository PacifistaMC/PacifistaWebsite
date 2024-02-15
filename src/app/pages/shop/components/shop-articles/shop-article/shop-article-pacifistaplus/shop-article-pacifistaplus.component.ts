import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../../services/notifications/services/NotificationService";
import {
  PacifistaShopArticleDTO,
  PacifistaShopArticleService,
  PageOption,
  QueryBuilder,
  QueryParam
} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../../../environments/environment";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-shop-article-pacifistaplus',
  templateUrl: './shop-article-pacifistaplus.component.html',
  styleUrl: './shop-article-pacifistaplus.component.scss'
})
export class ShopArticlePacifistaplusComponent {

  private readonly articlesService: PacifistaShopArticleService;
  pacifistaPlusArticle?: PacifistaShopArticleDTO;

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.articlesService = new PacifistaShopArticleService(httpClient, environment.production);

    if (isPlatformBrowser(this.platformId)) {
      this.findPacifistaPlusArticle();
    }
  }

  private findPacifistaPlusArticle(): void {
    const builder = new QueryBuilder();
    const param = new QueryParam();
    param.key = 'name';
    param.value = 'Pacifista+';
    builder.addParam(param);

    this.articlesService.find(new PageOption(), builder).subscribe({
      next: (articles) => {
        if (articles.content.length > 0) {
          const article = articles.content[0];

          if (article.name === 'Pacifista+') {
            this.pacifistaPlusArticle = article;
          }
        }
      },
      error: err => {
        this.notificationService.onErrorRequest(err);
      }
    });
  }

}
