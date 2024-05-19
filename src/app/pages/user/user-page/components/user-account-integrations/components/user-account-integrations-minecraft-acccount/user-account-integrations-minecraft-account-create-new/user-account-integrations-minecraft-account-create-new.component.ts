import {Component, Input} from '@angular/core';
import {
  ErrorDto,
  PacifistaWebUserLinkDTO,
  PacifistaWebUserLinkService,
  UserDTO
} from "@funixproductions/funixproductions-requests";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../../../../services/notifications/services/NotificationService";
import {InputTextComponent} from "../../../../../../../../components/inputs/input-text/input-text.component";
import {SendButtonComponent} from "../../../../../../../../components/buttons/send-button/send-button.component";
import {NgIf} from "@angular/common";
import {environment} from "../../../../../../../../../environments/environment";

@Component({
  selector: 'app-user-account-integrations-minecraft-account-create-new',
  standalone: true,
  imports: [
    InputTextComponent,
    SendButtonComponent,
    NgIf
  ],
  templateUrl: './user-account-integrations-minecraft-account-create-new.component.html',
  styleUrl: './user-account-integrations-minecraft-account-create-new.component.scss'
})
export class UserAccountIntegrationsMinecraftAccountCreateNewComponent {

  private readonly linkService: PacifistaWebUserLinkService

  @Input() user?: UserDTO

  link?: PacifistaWebUserLinkDTO

  minecraftUsername: string = ''
  errorStr?: string
  loading: boolean = false

  constructor(public activeModal: NgbActiveModal,
              private notificationService: NotificationService,
              http: HttpClient) {
    this.linkService = new PacifistaWebUserLinkService(http, environment.production)

    this.linkService.getCurrentUserLink().subscribe({
      next: (link) => {
        if (link.linked === true) {
          this.close()
        }
        this.link = link
      },
      error: (error: ErrorDto) => {
        this.link = undefined

        if (error.status !== 404) {
          this.notificationService.onErrorRequest(error)
        }
      }
    })
  }

  createLink(): void {
    this.errorStr = undefined
    this.link = undefined

    if (this.minecraftUsername.length === 0) {
      this.errorStr = 'Le nom d\'utilisateur Minecraft ne peut pas être vide.';
      return
    }

    this.loading = true
    this.linkService.linkUser(this.minecraftUsername).subscribe({
      next: (link) => {
        this.loading = false
        this.link = link
        this.notificationService.info('Le compte Minecraft a été lié avec succès.')
      },
      error: (error: ErrorDto) => {
        this.errorStr = error.error
        this.loading = false
      }
    })
  }

  close() {
    this.activeModal.close()
  }

}
