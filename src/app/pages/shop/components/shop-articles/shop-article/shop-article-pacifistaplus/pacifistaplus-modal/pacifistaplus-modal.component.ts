import {Component, Input} from '@angular/core';
import ShopService from "../../../../../shop-service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-pacifistaplus-modal',
  templateUrl: './pacifistaplus-modal.component.html',
  styleUrl: './pacifistaplus-modal.component.scss'
})
export class PacifistaplusModalComponent {

  @Input() pacifistaPlus?: PacifistaShopArticleDTO;
  @Input() pacifistaPlus3Months?: PacifistaShopArticleDTO;
  @Input() pacifistaPlus6Months?: PacifistaShopArticleDTO;
  @Input() pacifistaPlus12Months?: PacifistaShopArticleDTO;

  constructor(public activeModal: NgbActiveModal,
              protected shopService: ShopService) {
  }

  getBody(): string {
    return this.pacifistaPlus?.htmlDescription || '';
  }

}
