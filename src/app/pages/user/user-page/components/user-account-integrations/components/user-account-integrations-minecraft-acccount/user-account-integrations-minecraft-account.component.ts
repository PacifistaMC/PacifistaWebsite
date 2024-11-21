import {AfterViewInit, Component, Input} from '@angular/core';
import {
    ErrorDto,
    PacifistaWebUserLinkDTO,
    PacifistaWebUserLinkService,
    UserDTO
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../../environments/environment";
import NotificationService from "../../../../../../../services/notifications/services/NotificationService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    UserAccountIntegrationsMinecraftAccountCreateNewComponent
} from "./user-account-integrations-minecraft-account-create-new/user-account-integrations-minecraft-account-create-new.component";

@Component({
  selector: 'app-user-account-integrations-minecraft-acccount',
  templateUrl: './user-account-integrations-minecraft-account.component.html',
  styleUrl: './user-account-integrations-minecraft-account.component.scss'
})
export class UserAccountIntegrationsMinecraftAccountComponent implements AfterViewInit {

  private readonly linkService: PacifistaWebUserLinkService

  @Input() user?: UserDTO
  link?: PacifistaWebUserLinkDTO

  error: boolean = false
  loading: boolean = true

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService,
              private modalService: NgbModal) {
    this.linkService = new PacifistaWebUserLinkService(httpClient, environment.production)
  }

  ngAfterViewInit(): void {
    this.refresh()
  }

  refresh() {
    this.error = false
    this.loading = true

    this.linkService.getCurrentUserLink().subscribe({
      next: (link) => {
        this.link = link
        this.loading = false
      },
      error: (error: ErrorDto) => {
        this.link = undefined

        if (error.status !== 404) {
          this.error = true
          this.notificationService.onErrorRequest(error)
        }
        this.loading = false
      }
    })
  }

  unlink(): void {
    this.linkService.unlinkUser().subscribe({
      next: () => {
        this.link = undefined
        this.notificationService.info('Le compte Minecraft a été délié avec succès.')
      },
      error: (error: ErrorDto) => {
        this.notificationService.onErrorRequest(error)
      }
    })
  }

  openCreationModal() {
    const modalRef = this.modalService.open(UserAccountIntegrationsMinecraftAccountCreateNewComponent, { centered: true});
    modalRef.componentInstance.user = this.user;
    modalRef.closed.subscribe({
      next: () => {
        this.refresh()
      }
    })
  }

}
