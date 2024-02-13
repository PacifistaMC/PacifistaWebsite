import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-shop-article-modal',
  templateUrl: './shop-article-modal.component.html',
  styleUrls: ['./shop-article-modal.component.scss']
})
export class ShopArticleModalComponent {

  @Input() article: PacifistaShopArticleDTO = new PacifistaShopArticleDTO();

  constructor(public activeModal: NgbActiveModal) {
  }

}
