import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-shop-article-modal',
  templateUrl: './shop-article-modal.component.html',
  styleUrls: ['./shop-article-modal.component.scss']
})
export class ShopArticleModalComponent {

  protected readonly faCartDown = faCartArrowDown;

  @Input() article: PacifistaShopArticleDTO = new PacifistaShopArticleDTO();

  constructor(public activeModal: NgbActiveModal) {
  }

}
