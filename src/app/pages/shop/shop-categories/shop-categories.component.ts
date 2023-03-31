import { Component } from '@angular/core';
import ShopCategoryDTO from "../../../services/pacifista-api/shop/categories/dtos/ShopCategoryDTO";

@Component({
  selector: 'app-shop-categories',
  templateUrl: './shop-categories.component.html',
  styleUrls: ['./shop-categories.component.scss']
})
export class ShopCategoriesComponent {

  categoriesList: ShopCategoryDTO[] = [];

  constructor() {
    const gradesCategory = new ShopCategoryDTO();
    gradesCategory.name = "Grades";

    this.categoriesList.push(gradesCategory);
  }

}
