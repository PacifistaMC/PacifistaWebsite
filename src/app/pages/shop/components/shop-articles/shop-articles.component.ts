import {Component} from '@angular/core';
import {PacifistaShopArticleDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-shop-articles',
  templateUrl: './shop-articles.component.html',
  styleUrls: ['./shop-articles.component.scss']
})
export class ShopArticlesComponent {

  articlesList: PacifistaShopArticleDTO[] = [];

  constructor() {

  }

}
