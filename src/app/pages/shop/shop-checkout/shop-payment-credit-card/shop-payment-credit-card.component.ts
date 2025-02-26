import {Component} from '@angular/core';
import {
    PacifistaPaymentRequestDTO,
    PacifistaPaymentService,
    PacifistaShopCreditCardDTO
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import ShopService from "../../shop-service";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {Router} from "@angular/router";

@Component({
    selector: 'app-shop-payment-credit-card',
    templateUrl: './shop-payment-credit-card.component.html',
    styleUrl: './shop-payment-credit-card.component.scss',
    standalone: false
})
export class ShopPaymentCreditCardComponent {

  private readonly paymentService: PacifistaPaymentService;

  cardHolderName: string = "";
  cardHolderNameError: string[] = [];

  cardNumber: string = "";
  cardNumberError: string[] = [];

  expirationMonth?: number;
  expirationMonthError: string[] = [];

  expirationYear?: number;
  expirationYearError: string[] = [];

  securityCode: string = "";
  securityCodeError: string[] = [];

  loading: boolean = false;
  formSent: boolean = false;

  constructor(protected shopService: ShopService,
              protected notificationService: NotificationService,
              protected router: Router,
              httpClient: HttpClient) {
    this.paymentService = new PacifistaPaymentService(httpClient, environment.production);
  }

  createOrder(): void {
    if (this.shopService.totalArticlesInBasket() === 0) {
      this.notificationService.info("Votre panier est vide. Veuillez ajouter des articles avant de procéder au paiement.", "Paiement");
      return;
    }

    const request = new PacifistaPaymentRequestDTO();
    request.creditCard = this.createCardDTO();
    request.articles = this.shopService.createArticlesRequestList();

    this.formSent = false;
    this.loading = true;
    this.cardHolderNameError = [];
    this.cardNumberError = [];
    this.expirationMonthError = [];
    this.expirationYearError = [];
    this.securityCodeError = [];

    this.paymentService.createOrder(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.formSent = true;

        if (!response.paymentExternalOrderId) {
          this.notificationService.error('Une erreur est survenue lors de la création de la commande', 'Carte blue');
          return;
        }

        const redirectUrl: string | undefined = response.urlClientRedirection;

        if (redirectUrl) {
          localStorage.setItem('paymentExternalOrderId', response.paymentExternalOrderId);
          window.location.href = redirectUrl;
        } else {
          this.router.navigate(['/shop/checkout/check'], {queryParams: {token: response.paymentExternalOrderId}});
        }
      },
      error: (error) => {
        this.formSent = true;
        this.loading = false;

        for (let fieldError of error.fieldErrors) {
          switch (fieldError.field) {
            case 'creditCard.cardHolderName':
              this.cardHolderNameError.push(fieldError.message);
              break;
            case 'creditCard.cardNumber':
              this.cardNumberError.push(fieldError.message);
              break;
            case 'creditCard.expirationMonth':
              this.expirationMonthError.push(fieldError.message);
              break;
            case 'creditCard.expirationYear':
              this.expirationYearError.push(fieldError.message);
              break;
            case 'creditCard.securityCode':
              this.securityCodeError.push(fieldError.message);
              break;
          }
        }

        this.notificationService.onErrorRequest(error);
      }
    });
  }

  private createCardDTO(): PacifistaShopCreditCardDTO {
    const card = new PacifistaShopCreditCardDTO();

    card.cardHolderName = this.cardHolderName;
    card.cardNumber = this.parseCardNumber();
    card.securityCode = this.securityCode;
    card.expirationMonth = this.expirationMonth;
    card.expirationYear = this.expirationYear;
    return card;
  }

  /**
   * Parse the card number to keep only the digits
   * @private
   */
  private parseCardNumber(): string {
    return this.cardNumber.replace(/\D/g, '');
  }

}
