import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {PacifistaShopArticleDTO, PacifistaShopArticleService} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../../environments/environment";
import MarkdownIt from "markdown-it";

@Component({
  selector: 'app-shop-article-handler',
  standalone: false,
  templateUrl: './shop-article-handler.component.html',
  styleUrl: './shop-article-handler.component.scss'
})
export class ShopArticleHandlerComponent implements OnInit {

  private readonly articleService: PacifistaShopArticleService;
  private readonly categoryService: PacifistaShopArticleService;

  protected article?: PacifistaShopArticleDTO;

  protected readonly mdParser = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              protected sanitizer: DomSanitizer) {
    this.articleService = new PacifistaShopArticleService(httpClient, environment.production);
    this.categoryService = new PacifistaShopArticleService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const articleId = params['id'];
      if (!articleId) {
        this.router.navigate(['/admin/shop/articles']);
        return;
      }

      if (articleId !== 'create') {
        this.getArticle(articleId);
      }
    })
  }

  private getArticle(id: string) {
    this.articleService.getById(id).subscribe({
        next: (article) => {
          this.article = article;
        },
        error: (error) => {
            this.notificationService.onErrorRequest(error);
        }
    })
  }

}
