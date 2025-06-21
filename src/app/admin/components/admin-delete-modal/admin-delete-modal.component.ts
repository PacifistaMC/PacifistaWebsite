import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiDTO, CrudHttpClient} from "@funixproductions/funixproductions-requests";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import NotificationService from "../../../services/notifications/services/NotificationService";

@Component({
  selector: 'app-admin-delete-modal',
  templateUrl: './admin-delete-modal.component.html',
  styleUrl: './admin-delete-modal.component.scss',
  standalone: false
})
export class AdminDeleteModalComponent<T extends ApiDTO, CLIENT extends CrudHttpClient<T>> {

  @Input() dto?: T
  @Input() client?: CLIENT
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>()

  loadingRequest: boolean = false

  constructor(public activeModal: NgbActiveModal,
              private readonly notificationService: NotificationService) {
  }

  deleteEntity(): void {
    if (!this.loadingRequest && this.dto && this.client && this.dto.id) {
      this.loadingRequest = true;

      this.client.delete(this.dto.id).subscribe({
        next: _ => {
          this.loadingRequest = false;
          this.onDelete.emit(true);
          this.activeModal.close('Close success request')
        },
        error: err => {
          this.loadingRequest = false;
          this.notificationService.onErrorRequest(err)
        }
      })
    }
  }

  closeModal() {
    this.activeModal.close('Close click')
    this.onDelete.emit(false)
  }

}
