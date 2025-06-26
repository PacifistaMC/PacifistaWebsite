import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ErrorDto,
  PacifistaShopArticleDTO,
  PacifistaShopArticleService,
  PacifistaShopCategoryDTO
} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../../environments/environment";
import ShopService from "../../../../../pages/shop/shop-service";

@Component({
  selector: 'app-shop-article-handler',
  standalone: false,
  templateUrl: './shop-article-handler.component.html',
  styleUrl: './shop-article-handler.component.scss'
})
export class ShopArticleHandlerComponent implements OnInit {

  private readonly articleService: PacifistaShopArticleService;

  protected article: PacifistaShopArticleDTO = new PacifistaShopArticleDTO(
      new PacifistaShopCategoryDTO(
          '', '', false
      ),
      '', '', '', '', 0.0, '', undefined
  );

  protected articleFile?: File;
  protected articleFileUrl?: string;

  protected nameErrors: string[] = [];
  protected descriptionErrors: string[] = [];
  protected priceErrors: string[] = [];
  protected commandExecutedErrors: string[] = [];

  protected loading: boolean = false;
  protected formSent: boolean = false;

  constructor(httpClient: HttpClient,
              private readonly notificationService: NotificationService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {
    this.articleService = new PacifistaShopArticleService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const articleId = params['id'];
      if (!articleId) {
        this.router.navigate(['..']);
        return;
      }

      if (articleId !== 'create') {
        this.articleService.getById(articleId).subscribe({
          next: (article) => {
            this.article = article;
            this.articleFileUrl = ShopService.getImageUrl(article);
          },
          error: (error) => this.notificationService.onErrorRequest(error)
        })
      }
    })
  }

  setCategory(category?: PacifistaShopCategoryDTO): void {
    if (category) {
      this.article.category = category;
    } else {
        this.article.category = new PacifistaShopCategoryDTO('', '', false);
    }
  }

  saveArticle(): void {
    this.loading = true;
    this.formSent = false;

    if (this.article.id) {
      if (this.articleFile) {
        this.articleService.fullUpdateFile(this.article, this.articleFile).subscribe({
          next: this.successSave,
          error: this.failureSave
        });
      } else {
        this.articleService.update(this.article).subscribe({
          next: this.successSave,
          error: this.failureSave
        });
      }
    } else if (!this.articleFile) {
      this.notificationService.error("Veuillez sélectionner un fichier pour l'article.");
      this.loading = false;
    } else {
      this.articleService.sendFile(this.article, this.articleFile).subscribe({
        next: this.successSave,
        error: this.failureSave
      });
    }

  }

  private successSave(article: PacifistaShopArticleDTO): void {

  }

  private failureSave(error: ErrorDto): void {

  }

}
