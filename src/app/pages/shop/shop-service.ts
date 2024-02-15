import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";
import ShopCart from "./ShopCart";
import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import NotificationService from "../../services/notifications/services/NotificationService";
import {isPlatformBrowser} from "@angular/common";
import {environment} from "../../../environments/environment";

@Injectable()
export default class ShopService {

    private readonly basket: Map<PacifistaShopArticleDTO, number> = new Map<PacifistaShopArticleDTO, number>();

    constructor(protected notificationService: NotificationService,
                @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadArticles();
        }
    }

    addArticleToBasket(shopCart: ShopCart): void {
        const article = shopCart.article;
        const amount = shopCart.amount;
        const basketEntry = this.basket.get(article);

        if (!basketEntry) {
            this.basket.set(article, amount);
        } else {
            if (article.category?.multiPurchaseAllowed) {
                this.basket.set(article, basketEntry + amount);
            } else {
                this.basket.set(article, amount);
            }
        }
        this.saveBasket();
        this.notificationService.info(`Article ${article.name} ajouté au panier. Quantité: ${amount}`, "Boutique");
    }

    removeArticleFromBasket(article: PacifistaShopArticleDTO, amount: number): void {
        const basketEntry = this.basket.get(article);

        if (!basketEntry) return;

        if (basketEntry - amount <= 0) {
            this.basket.delete(article);
        } else {
            this.basket.set(article, basketEntry - amount);
        }
        this.saveBasket();
        this.notificationService.info(`Article ${article.name} retiré du panier. Quantité: ${amount}`, "Boutique");
    }

    countTotalPrice(): number {
        let totalPrice = 0;

        this.basket.forEach((amount, article) => {
            totalPrice += (article.priceWithTax ?? 0) * amount;
        });
        return totalPrice;
    }

    totalArticlesInBasket(): number {
        let total = 0;

        this.basket.forEach((amount) => total += amount);
        return total;
    }

    private saveBasket(): void {
        const basket = Array.from(this.basket.entries());
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    private loadArticles(): void {
        const basket = localStorage.getItem("basket");
        if (basket) {
            const basketMap: Map<PacifistaShopArticleDTO, number> = new Map(JSON.parse(basket));

            this.basket.clear();
            basketMap.forEach((value, key) => this.basket.set(key, value));
        }
    }

    getBasket(): Map<PacifistaShopArticleDTO, number> {
        return this.basket;
    }

    getImageLogo(article: PacifistaShopArticleDTO): string {
        return environment.pacifistaApiDomain + "web/shop/articles/file/" + article.id;
    }

    formatPrice(price?: number): string {
        if (!price) return "0,00 €";

        return price.toFixed(2).replace(".", ",") + " €";
    }

}