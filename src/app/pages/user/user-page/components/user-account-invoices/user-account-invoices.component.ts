import {AfterViewInit, Component, Input} from '@angular/core';
import {
  FunixprodBillingDto,
  FunixprodBillingService,
  PageOption,
  QueryBuilder,
  UserDTO
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import NotificationService from "../../../../../services/notifications/services/NotificationService";

@Component({
  selector: 'app-user-account-invoices',
  templateUrl: './user-account-invoices.component.html',
  styleUrl: './user-account-invoices.component.scss'
})
export class UserAccountInvoicesComponent implements AfterViewInit {

  private readonly billingService: FunixprodBillingService
  @Input() user: UserDTO = new UserDTO()

  page: number = 0
  invoices: FunixprodBillingDto[] = []
  loading: boolean = true

  constructor(httpClient: HttpClient, private notificationService: NotificationService) {
    this.billingService = new FunixprodBillingService(httpClient, environment.production)
  }

  ngAfterViewInit(): void {
    this.refreshList()
  }

  pageUp() {
    ++this.page
    this.refreshList()
  }

  pageDown() {
    if (this.page > 0) {
      --this.page
      this.refreshList()
    }
  }

  download(billing: FunixprodBillingDto) {
    if (!billing.id) return
    this.billingService.downloadInvoice(billing.id)
  }

  private refreshList() {
    const pageOption = new PageOption()
    pageOption.sort = "createdAt:desc"
    pageOption.elemsPerPage = 10
    pageOption.page = this.page

    this.loading = true
    this.billingService.find(pageOption, new QueryBuilder()).subscribe({
      next: page => {
        this.invoices = page.content
        this.loading = false
      },
      error: err => {
        this.notificationService.onErrorRequest(err)
        this.loading = false
      }
    })
  }

}
