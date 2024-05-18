import {Component, Input} from '@angular/core';
import {ErrorDto, PacifistaWebUserLinkService, UserDTO} from "@funixproductions/funixproductions-requests";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../../../../../environments/environment";

@Component({
  selector: 'app-user-account-integrations-minecraft-account-create-new',
  standalone: true,
  imports: [],
  templateUrl: './user-account-integrations-minecraft-account-create-new.component.html',
  styleUrl: './user-account-integrations-minecraft-account-create-new.component.scss'
})
export class UserAccountIntegrationsMinecraftAccountCreateNewComponent {

  private readonly linkService: PacifistaWebUserLinkService

  @Input() user?: UserDTO
  minecraftUsername: string = ''
  errorStr?: string

  constructor(public activeModal: NgbActiveModal,
              private notificationService: NotificationService,
              http: HttpClient) {
    this.linkService = new PacifistaWebUserLinkService(http, environment.production)
  }

  createLink(): void {
    this.errorStr = undefined

    if (this.minecraftUsername.length === 0) {
      this.errorStr = 'Le nom d\'utilisateur Minecraft ne peut pas être vide.';
      return
    }

    this.linkService.linkUser(this.minecraftUsername).subscribe({
      next: (link) => {
        this.activeModal.close()
        this.notificationService.info('Le compte Minecraft a été lié avec succès.')
      },
      error: (error: ErrorDto) => {
        this.errorStr = error.error
      }
    })
  }

  close() {
    this.activeModal.close()
  }

}
