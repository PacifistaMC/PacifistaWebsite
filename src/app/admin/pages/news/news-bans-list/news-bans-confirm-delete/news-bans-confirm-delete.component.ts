import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PacifistaNewsBanDTO} from "@funixproductions/funixproductions-requests";
import {NewsBansListComponent} from "../news-bans-list.component";

@Component({
  selector: 'app-news-bans-confirm-delete',
  templateUrl: './news-bans-confirm-delete.component.html',
  styleUrl: './news-bans-confirm-delete.component.scss'
})
export class NewsBansConfirmDeleteComponent {

  @Input() ban?: PacifistaNewsBanDTO;
  @Input() parent?: NewsBansListComponent

  constructor(public activeModal: NgbActiveModal) {
  }

  onRemoveBanClick() {
    if (!this.ban || !this.ban.id) {
      this.activeModal.dismiss();
    } else {
      this.parent?.delete(this.ban);
      this.activeModal.close();
    }
  }

}
