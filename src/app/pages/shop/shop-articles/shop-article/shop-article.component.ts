import {Component, Input} from '@angular/core';
import ShopItemDTO from "../../../../services/pacifista-api/shop/categories/dtos/ShopItemDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShopArticleModalComponent} from "../shop-article-modal/shop-article-modal.component";

@Component({
  selector: 'app-shop-article',
  templateUrl: './shop-article.component.html',
  styleUrls: ['./shop-article.component.scss']
})
export class ShopArticleComponent {

  constructor(private modalService: NgbModal) {
  }

  @Input() article: ShopItemDTO = new ShopItemDTO();

  openModal(): void {
    const modalRef = this.modalService.open(ShopArticleModalComponent, { centered: true});
    modalRef.componentInstance.article = this.article;
  }

}
