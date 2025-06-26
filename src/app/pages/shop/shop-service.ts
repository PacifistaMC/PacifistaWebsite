import {
    PacifistaPaymentService,
    PacifistaShopArtcileRequestDTO,
    PacifistaShopArticleDTO
} from "@funixproductions/funixproductions-requests";
import ShopCart from "./ShopCart";
import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import NotificationService from "../../services/notifications/services/NotificationService";
import {isPlatformBrowser} from "@angular/common";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export default class ShopService {

    public static readonly PACIFISTA_PLUS_PREFIX_NAME: string = "pacifista-plus";

    private readonly basket: Map<string, ShopCart> = new Map<string, ShopCart>();
    private readonly paymentService: PacifistaPaymentService;

    constructor(protected notificationService: NotificationService,
                @Inject(PLATFORM_ID) private readonly platformId: Object,
                http: HttpClient) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadArticles();
        }
        
        this.paymentService = new PacifistaPaymentService(http, environment.production);
    }

    addArticleToBasket(shopCart: ShopCart): void {
        const article = shopCart.article;
        if (!article.id) return

        const amount = shopCart.amount;
        const basketEntry = this.basket.get(article.id);

        if (!basketEntry) {
            this.basket.set(article.id, shopCart);
        } else if (article.category?.multiPurchaseAllowed) {
            this.basket.set(article.id, new ShopCart(article, basketEntry.amount + amount));
        } else {
            this.basket.set(article.id, shopCart);
        }

        this.saveBasket();
        this.notificationService.info(`Article ${article.name} ajouté au panier. Quantité: ${amount}`, "Boutique");
    }

    removeArticleFromBasket(article: PacifistaShopArticleDTO, amount: number): void {
        if (!article.id) return
        const basketEntry = this.basket.get(article.id);
        if (!basketEntry) return;

        if (basketEntry.amount - amount <= 0) {
            this.basket.delete(article.id);
        } else {
            this.basket.set(article.id, new ShopCart(article, basketEntry.amount - amount));
        }
        this.saveBasket();
    }

    clearArticleRowFromBasket(article: PacifistaShopArticleDTO): void {
        if (!article.id) return
        this.basket.delete(article.id);
        this.saveBasket();
    }

    clearBasket(): void {
        this.basket.clear();
        this.saveBasket();
    }

    createArticlesRequestList(): PacifistaShopArtcileRequestDTO[] {
        const articles: PacifistaShopArtcileRequestDTO[] = [];

        this.basket.forEach((cart, articleId) => {
            articles.push(new PacifistaShopArtcileRequestDTO(articleId, cart.amount));
        });
        return articles;
    }

    countTotalPrice(): number {
        let totalPrice = 0;

        this.basket.forEach((cart, articleId) => {
            totalPrice += (cart.article.priceWithTax ?? 0) * cart.amount;
        });
        return totalPrice;
    }

    totalArticlesInBasket(): number {
        let total = 0;

        this.basket.forEach((cart) => total += cart.amount);
        return total;
    }

    private saveBasket(): void {
        const basket = Array.from(this.basket.entries());
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    private loadArticles(): void {
        const basket = localStorage.getItem("basket");
        if (basket) {
            const basketMap: Map<string, ShopCart> = new Map(JSON.parse(basket));

            this.basket.clear();
            basketMap.forEach((cart, articleId) => this.basket.set(articleId, cart));
        }
    }

    getBasket(): ShopCart[] {
        const basket: ShopCart[] = [];

        this.basket.forEach((cartItem, articleId) => basket.push(cartItem));
        return basket;
    }

    public static getImageUrl(article: PacifistaShopArticleDTO): string {
        return environment.pacifistaApiDomain + "web/shop/articles/file/" + article.id;
    }

    formatPrice(price?: number): string {
        if (!price) return "0,00";

        return price.toFixed(2).replace(".", ",");
    }

}