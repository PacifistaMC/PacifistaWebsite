import {Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {
    PacifistaShopCategoryDTO,
    PacifistaShopCategoryService,
    PageOption,
    QueryBuilder
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {isPlatformServer} from "@angular/common";
import ShopService from "../../shop-service";

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
  dropdownOpen: boolean = false;

  @ViewChild('categoryListSection', { static: false }) protected categoryListSection: any

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.categoriesService = new PacifistaShopCategoryService(httpClient, environment.production);
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return
    }

    const pageOption: PageOption = new PageOption();
    pageOption.elemsPerPage = 100;
    pageOption.page = 0;
    pageOption.sort = 'name:asc';

    this.categoriesService.find(pageOption, new QueryBuilder()).subscribe({
      next: (categories) => {
        this.categoriesList = [];

        categories.content.forEach(category => {
          if (category.name !== ShopService.PACIFISTA_PLUS_PREFIX_NAME) {
            this.categoriesList.push(category);
          }
        });
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

  clickDropdown() {
    if (!this.dropdownOpen) {
      this.categoryListSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.dropdownOpen = !this.dropdownOpen;
  }

}
