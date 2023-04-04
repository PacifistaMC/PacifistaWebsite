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
    article.price = 14.99;
    article.name = "Grade Elite";
    article.description = "Grade elite";
    article.htmlDescription = "<p>Un super grade (à rédiger)</p>";
    article.logoUrl = "https://pacifista.fr/app/webroot/img/shop/grades/Badge-Elite.png"

    const article2 = new ShopItemDTO();
    article2.price = 19.99;
    article2.name = "Grade légendaire";
    article2.description = "Le grade le plus cool du serveur !";
    article2.htmlDescription = "<p>Un super grade (à régiger aussi)</p>";
    article2.logoUrl = "https://pacifista.fr/app/webroot/img/shop/grades/Badge-Legendaire.png"

    this.articlesList.push(article);
    this.articlesList.push(article2);
  }

}
