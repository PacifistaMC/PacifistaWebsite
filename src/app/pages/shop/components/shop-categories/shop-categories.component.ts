import {Component} from '@angular/core';
import {PacifistaShopCategoryDTO} from "@funixproductions/funixproductions-requests";

@Component({
  selector: 'app-shop-categories',
  templateUrl: './shop-categories.component.html',
  styleUrls: ['./shop-categories.component.scss']
})
export class ShopCategoriesComponent {

  categoriesList: PacifistaShopCategoryDTO[] = [];

  constructor() {
    const gradesCategory = new PacifistaShopCategoryDTO();
    gradesCategory.name = "Grades";

    this.categoriesList.push(gradesCategory);
  }

}
