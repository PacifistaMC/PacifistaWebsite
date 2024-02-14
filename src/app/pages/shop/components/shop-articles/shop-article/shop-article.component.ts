import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShopArticleModalComponent} from "../shop-article-modal/shop-article-modal.component";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../../environments/environment";
import ShopCart from "../../../ShopCart";

@Component({
  selector: 'app-shop-article',
  templateUrl: './shop-article.component.html',
  styleUrls: ['./shop-article.component.scss']
})
export class ShopArticleComponent {

  constructor(private modalService: NgbModal) {
  }

  @Output() onCartAdd = new EventEmitter<ShopCart>();
  @Input() article: PacifistaShopArticleDTO = new PacifistaShopArticleDTO();
  amountBuy: number = 1;

  openModal(): void {
    const modalRef = this.modalService.open(ShopArticleModalComponent, { centered: true});
    modalRef.componentInstance.article = this.article;
  }

  getImageLogo(): string {
    return environment.pacifistaApiDomain + "web/shop/articles/file/" + this.article.id;
  }

  addOneItem(): void {
    this.amountBuy++;
  }

  removeOneItem(): void {
    if (this.amountBuy > 1) {
      this.amountBuy--;
    }
  }

  addToCart(): void {
    this.onCartAdd.emit(new ShopCart(this.article, this.amountBuy));
  }

}
