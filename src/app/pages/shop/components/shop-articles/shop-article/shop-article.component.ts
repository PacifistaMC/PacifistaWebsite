import {Component, Input} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShopArticleModalComponent} from "../shop-article-modal/shop-article-modal.component";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-shop-article',
  templateUrl: './shop-article.component.html',
  styleUrls: ['./shop-article.component.scss']
})
export class ShopArticleComponent {

  constructor(private modalService: NgbModal) {
  }

  @Input() article: PacifistaShopArticleDTO = new PacifistaShopArticleDTO();

  openModal(): void {
    const modalRef = this.modalService.open(ShopArticleModalComponent, { centered: true});
    modalRef.componentInstance.article = this.article;
  }

  getImageLogo(): string {
    return environment.pacifistaApiDomain + "/web/shop/articles/file/" + this.article.id;
  }

}
