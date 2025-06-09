import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";
import ShopService from "../../../shop-service";

@Component({
    selector: 'app-shop-article-modal',
    templateUrl: './shop-article-modal.component.html',
    styleUrls: ['./shop-article-modal.component.scss'],
    standalone: false
})
export class ShopArticleModalComponent {

  @Input() article!: PacifistaShopArticleDTO;

  constructor(public activeModal: NgbActiveModal,
              protected shopService: ShopService) {
  }

}
