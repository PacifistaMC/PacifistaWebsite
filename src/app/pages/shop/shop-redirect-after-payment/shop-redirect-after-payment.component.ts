import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import ShopService from "../shop-service";
import {
  ErrorDto,
  PacifistaPaymentResponseDTO,
  PacifistaPaymentService
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import NotificationService from "../../../services/notifications/services/NotificationService";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-shop-redirect-after-payment',
  templateUrl: './shop-redirect-after-payment.component.html',
  styleUrl: './shop-redirect-after-payment.component.scss'
})
export class ShopRedirectAfterPaymentComponent implements AfterViewInit {

  loading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
              private shopService: ShopService,
              private notificationService: NotificationService,
              private httpClient: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.queryParams.subscribe(params => {
      let orderId = params['token'];

      if (!orderId) {
        orderId = localStorage.getItem('paymentExternalOrderId');

        if (!orderId) {
          this.loading = false;
          this.errorMessage = "Votre achat n'a pas été validé. Veuillez recommencer. Vous n'avez pas été débité.";
          return;
        }
      }

      const paymentService = new PacifistaPaymentService(this.httpClient, environment.production);

      paymentService.getStatus(orderId).subscribe({
        next: (response) => {
          if (response.orderPaid) {
            this.onSuccess(response);
          } else {
            this.capturePayment(orderId, paymentService);
          }
        },
        error: (error: ErrorDto) => {
          this.onError(error);
        }
      });
    });
  }

  private onSuccess(response: PacifistaPaymentResponseDTO) {
    this.loading = false;

    if (response.orderPaid) {
      this.errorMessage = '';
      this.shopService.clearBasket();
    } else {
      this.errorMessage = "Votre achat n'a pas été validé. Veuillez recommencer. Vous n'avez pas été débité.";
    }
  }

  private onError(error: ErrorDto) {
    this.loading = false;
    this.errorMessage = "Une erreur est survenue. Veuillez recommencer. Vous n'avez pas été débité." +
        " (Erreur: " + error.error + ", code: " + error.status + ")";
    this.notificationService.onErrorRequest(error);
  }

  private capturePayment(orderId: string, paymentService: PacifistaPaymentService) {
    paymentService.captureOrder(orderId).subscribe({
      next: (response) => {
        this.onSuccess(response);
        localStorage.removeItem('paymentExternalOrderId');
      },
      error: (error: ErrorDto) => {
        this.onError(error);
      }
    });
  }

}
