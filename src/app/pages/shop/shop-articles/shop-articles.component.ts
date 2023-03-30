import { Component } from '@angular/core';
import ShopItemDTO from "../../../services/pacifista-api/shop/categories/dtos/ShopItemDTO";

@Component({
  selector: 'app-shop-articles',
  templateUrl: './shop-articles.component.html',
  styleUrls: ['./shop-articles.component.scss']
})
export class ShopArticlesComponent {

  articlesList: ShopItemDTO[] = [];

  constructor() {
    const article = new ShopItemDTO();
    article.price = 19.99;
    article.name = "Grade légendaire";
    article.description = "Le grade le plus cool du serveur !";
    article.htmlDescription = "<p>Un super grade</p>";
    article.logoUrl = "https://pacifista.fr/app/webroot/img/shop/grades/Badge-Elite.png"

    const article2 = new ShopItemDTO();
    article2.price = 19.99;
    article2.name = "Grade légendaire";
    article2.description = "Le grade le plus cool du serveur !";
    article2.htmlDescription = "<p>Un super grade</p>";
    article2.logoUrl = "https://pacifista.fr/app/webroot/img/shop/grades/Badge-Elite.png"

    this.articlesList.push(article);
    this.articlesList.push(article2);
  }

}
