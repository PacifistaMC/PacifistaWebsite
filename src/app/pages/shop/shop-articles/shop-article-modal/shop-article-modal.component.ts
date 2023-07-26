import {Component, Input} from '@angular/core';
import ShopItemDTO from "../../../../services/pacifista-api/shop/categories/dtos/ShopItemDTO";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {faCartArrowDown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-shop-article-modal',
  templateUrl: './shop-article-modal.component.html',
  styleUrls: ['./shop-article-modal.component.scss']
})
export class ShopArticleModalComponent {

  protected readonly faCartDown = faCartArrowDown;

  @Input() article: ShopItemDTO = new ShopItemDTO();

  constructor(public activeModal: NgbActiveModal) {
  }

}
