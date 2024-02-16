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

  loading = false;

  constructor(protected shopService: ShopService,
              protected notificationService: NotificationService,
              httpClient: HttpClient) {
    this.paymentService = new PacifistaPaymentService(httpClient, environment.production);
  }

  createOrder(): void {
    if (this.shopService.totalArticlesInBasket() === 0) {
        this.notificationService.info("Votre panier est vide. Veuillez ajouter des articles avant de procéder au paiement.", "Paiement");
        return;
    }

    const request = new PacifistaPaymentRequestDTO();
    request.articles = this.shopService.createArticlesRequestList();

    this.loading = true;
    this.paymentService.createOrder(request).subscribe({
      next: (response) => {
        const redirectUrl: string | undefined = response.urlClientRedirection;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          this.notificationService.error("Erreur lors de la création de la commande. Veuillez envoyer un mail à contact@pacifista.fr", "Paiement");
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.onErrorRequest(error);
      }
    });
  }

}
