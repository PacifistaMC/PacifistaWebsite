import {Component} from '@angular/core';
import {PacifistaPaymentRequestDTO, PacifistaPaymentService} from "@funixproductions/funixproductions-requests";
import ShopService from "../../shop-service";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-shop-payment-paypal',
  templateUrl: './shop-payment-paypal.component.html',
  styleUrl: './shop-payment-paypal.component.scss'
})
export class ShopPaymentPaypalComponent {

  private readonly paymentService: PacifistaPaymentService;

  constructor(protected shopService: ShopService,
              protected notificationService: NotificationService,
              httpClient: HttpClient) {
    this.paymentService = new PacifistaPaymentService(httpClient, environment.production);
  }

  createOrder(): void {
    const request = new PacifistaPaymentRequestDTO();
    request.articles = this.shopService.createArticlesRequestList();

    this.paymentService.createOrder(request).subscribe({
      next: (response) => {
        const redirectUrl: string | undefined = response.urlClientRedirection;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          this.notificationService.error("Erreur lors de la création de la commande. Veuillez envoyer un mail à contact@pacifista.fr", "Paiement");
        }
      },
      error: (error) => {
        this.notificationService.onErrorRequest(error);
      }
    });
  }

}
