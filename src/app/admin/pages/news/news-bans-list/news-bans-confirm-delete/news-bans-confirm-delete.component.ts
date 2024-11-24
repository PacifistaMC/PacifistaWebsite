import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PacifistaNewsBanDTO, PacifistaNewsBanService} from "@funixproductions/funixproductions-requests";
import {NewsBansListComponent} from "../news-bans-list.component";
import NotificationService from "../../../../../services/notifications/services/NotificationService";

@Component({
  selector: 'app-news-bans-confirm-delete',
  templateUrl: './news-bans-confirm-delete.component.html',
  styleUrl: './news-bans-confirm-delete.component.scss'
})
export class NewsBansConfirmDeleteComponent {

  @Input() ban?: PacifistaNewsBanDTO;
  @Input() parent?: NewsBansListComponent

  loadingRemoveBan = false;

  constructor(public activeModal: NgbActiveModal,
              private newsBanService: PacifistaNewsBanService,
              private notificationService: NotificationService,
              ) {
  }

  onRemoveBanClick() {
    if (!this.ban || !this.parent || !this.ban.id) {
      this.activeModal.close();
      return
    }

    this.loadingRemoveBan = true;
    this.newsBanService.delete(this.ban.id).subscribe({
      next: () => {
        this.loadingRemoveBan = false;
        this.notificationService.info('Le ban a bien été supprimé');
        this.activeModal.close();
        this.parent!.removeDtoFromList(this.ban!);
      },
      error: () => {
        this.loadingRemoveBan = false;
        this.notificationService.error('Une erreur est survenue lors de la suppression du ban');
      }
    });
  }

}
