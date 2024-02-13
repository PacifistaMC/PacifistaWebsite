import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  PacifistaShopCategoryDTO,
  PacifistaShopCategoryService,
  PageOption,
  QueryBuilder
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import NotificationService from "../../../../services/notifications/services/NotificationService";

@Component({
  selector: 'app-shop-categories',
  templateUrl: './shop-categories.component.html',
  styleUrls: ['./shop-categories.component.scss']
})
export class ShopCategoriesComponent implements OnInit {

  private categoriesService: PacifistaShopCategoryService;
  @Output() onCategorySelected = new EventEmitter<PacifistaShopCategoryDTO>();

  categoriesList: PacifistaShopCategoryDTO[] = [];
  categorySelected?: PacifistaShopCategoryDTO;

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.categoriesService = new PacifistaShopCategoryService(httpClient, environment.production);
  }

  ngOnInit(): void {
    const pageOption: PageOption = new PageOption();
    pageOption.elemsPerPage = 100;
    pageOption.page = 0;
    pageOption.sort = 'name:asc';

    this.categoriesService.find(pageOption, new QueryBuilder()).subscribe({
      next: (categories) => {
        this.categoriesList = categories.content;
      },
      error: err => {
        this.notificationService.onErrorRequest(err);
      }
    });
  }

  selectCategory(category: PacifistaShopCategoryDTO): void {
    this.categorySelected = category;
    this.onCategorySelected.emit(category);
  }

  isCategorySelected(category: PacifistaShopCategoryDTO): boolean {
    return this.categorySelected?.id === category.id;
  }

}
