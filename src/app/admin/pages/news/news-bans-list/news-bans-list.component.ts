import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../../components/paginated/paginated.component";
import {PacifistaNewsBanDTO, PacifistaNewsBanService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewsBansConfirmDeleteComponent} from "./news-bans-confirm-delete/news-bans-confirm-delete.component";

@Component({
  selector: 'app-news-bans-list',
  templateUrl: './news-bans-list.component.html',
  styleUrl: './news-bans-list.component.scss'
})
export class NewsBansListComponent extends PaginatedComponent<PacifistaNewsBanDTO, PacifistaNewsBanService> {

  constructor(httpClient: HttpClient,
              notificationService: NotificationService,
              private modalService: NgbModal) {
    super(new PacifistaNewsBanService(httpClient, environment.production), httpClient, notificationService);
  }

  onRemoveBanClick(ban: PacifistaNewsBanDTO) {
    const modalRef = this.modalService.open(NewsBansConfirmDeleteComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.ban = ban;
    modalRef.componentInstance.parent = this;
  }

}
