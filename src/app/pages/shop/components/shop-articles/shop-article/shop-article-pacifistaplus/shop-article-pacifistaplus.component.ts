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
import ShopService from "../../../../shop-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PacifistaplusModalComponent} from "./pacifistaplus-modal/pacifistaplus-modal.component";

@Component({
    selector: 'app-shop-article-pacifistaplus',
    templateUrl: './shop-article-pacifistaplus.component.html',
    styleUrl: './shop-article-pacifistaplus.component.scss',
    standalone: false
})
export class ShopArticlePacifistaplusComponent {

  private readonly articlesService: PacifistaShopArticleService;

  loading: boolean = true;

  pacifistaPlus?: PacifistaShopArticleDTO;
  pacifistaPlus3Months?: PacifistaShopArticleDTO;
  pacifistaPlus6Months?: PacifistaShopArticleDTO;
  pacifistaPlus12Months?: PacifistaShopArticleDTO;

  constructor(httpClient: HttpClient,
              private modalService: NgbModal,
              private notificationService: NotificationService,
              protected shopService: ShopService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.articlesService = new PacifistaShopArticleService(httpClient, environment.production);

    if (isPlatformBrowser(this.platformId)) {
      this.findPacifistaPlusArticles();
    }
  }

  openModal(): void {
    const modalRef = this.modalService.open(PacifistaplusModalComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.pacifistaPlus = this.pacifistaPlus;
    modalRef.componentInstance.pacifistaPlus3Months = this.pacifistaPlus3Months;
    modalRef.componentInstance.pacifistaPlus6Months = this.pacifistaPlus6Months;
    modalRef.componentInstance.pacifistaPlus12Months = this.pacifistaPlus12Months;
  }

  private findPacifistaPlusArticles(): void {
    const builder = new QueryBuilder();
    const param = new QueryParam();
    param.key = 'name';
    param.value = ShopService.PACIFISTA_PLUS_PREFIX_NAME;
    param.type = QueryBuilder.like;

    builder.addParam(param);

    this.articlesService.find(new PageOption(), builder).subscribe({
      next: (articles) => {
        articles.content.forEach(article => {
          if (article.name === ShopService.PACIFISTA_PLUS_PREFIX_NAME + '-1') {
            this.pacifistaPlus = article;
          } else if (article.name === ShopService.PACIFISTA_PLUS_PREFIX_NAME + '-3') {
            this.pacifistaPlus3Months = article;
          } else if (article.name === ShopService.PACIFISTA_PLUS_PREFIX_NAME + '-6') {
            this.pacifistaPlus6Months = article;
          } else if (article.name === ShopService.PACIFISTA_PLUS_PREFIX_NAME + '-12') {
            this.pacifistaPlus12Months = article;
          }
        });

        this.loading = false;
      },
      error: err => {
        this.notificationService.onErrorRequest(err);
        this.loading = false;
      }
    });
  }

}
