import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

export default class ShopCart {
    article: PacifistaShopArticleDTO;
    amount: number;

    constructor(article: PacifistaShopArticleDTO, amount: number) {
        this.article = article;
        this.amount = amount;
    }
}
