import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {
  PacifistaShopArticleDTO,
  PacifistaShopArticleService,
  PacifistaShopCategoryDTO,
  PageOption,
  QueryBuilder,
  QueryParam
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import ShopCart from "../../ShopCart";

@Component({
  selector: 'app-shop-articles',
  templateUrl: './shop-articles.component.html',
  styleUrls: ['./shop-articles.component.scss']
})
export class ShopArticlesComponent implements OnChanges {

  private readonly articlesService: PacifistaShopArticleService;

  @Output() onCartAdd = new EventEmitter<ShopCart>();
  @Input() categorySelected?: PacifistaShopCategoryDTO;
  articlesList: PacifistaShopArticleDTO[] = [];

  loading: boolean = false;

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.articlesService = new PacifistaShopArticleService(httpClient, environment.production);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorySelected']) {
      this.updateArticles();
    }
  }

  updateArticles() {
    if (!this.categorySelected) return

    const pageOption = new PageOption();
    pageOption.elemsPerPage = 100;
    pageOption.page = 0;
    pageOption.sort = 'price:desc';

    const builder = new QueryBuilder();
    const param = new QueryParam();
    param.key = 'category.uuid';
    param.value = this.categorySelected.id;
    builder.addParam(param);

    this.loading = true;
    this.articlesList = [];
    this.articlesService.find(pageOption, builder).subscribe({
      next: (articles) => {
        const content = articles.content;

        for (let i = 0; i < content.length; i++) {
          const article = content[i];
          if (article.name !== 'Pacifista+') {
            this.articlesList.push(article);
          }
        }
        this.loading = false;
      },
      error: err => {
        this.notificationService.onErrorRequest(err);
        this.loading = false;
      }
    });
  }

}
