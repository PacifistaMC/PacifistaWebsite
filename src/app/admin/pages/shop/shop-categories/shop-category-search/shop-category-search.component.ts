import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {
  PacifistaShopCategoryDTO,
  PacifistaShopCategoryService,
  PageOption,
  QueryBuilder,
  QueryParam
} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-shop-category-search',
  standalone: false,
  templateUrl: './shop-category-search.component.html',
  styleUrl: './shop-category-search.component.scss'
})
export class ShopCategorySearchComponent implements AfterViewInit {

  private readonly categoryService: PacifistaShopCategoryService;

  @Input() searchText: string = '';
  @Output() onCategorySelected = new EventEmitter<PacifistaShopCategoryDTO>();
  @Output() onClearSearch = new EventEmitter<void>();

  categories: PacifistaShopCategoryDTO[] = [];
  loading: boolean = false;
  doneSearching: boolean = false;
  categorySelected: PacifistaShopCategoryDTO | null = null;
  @ViewChild('resultsContainer') resultsContainer?: ElementRef;

  private readonly pageOption: PageOption;

  constructor(
      httpClient: HttpClient,
      private readonly renderer: Renderer2,
      private readonly notificationService: NotificationService
  ) {
    this.categoryService = new PacifistaShopCategoryService(httpClient, environment.production);

    let pageOption = new PageOption();
    pageOption.page = 0;
    pageOption.elemsPerPage = 5;
    pageOption.sort = 'name:asc';
    this.pageOption = pageOption;

    this.renderer.listen('window', 'click', (event: Event) => {
      if (this.resultsContainer && !this.resultsContainer.nativeElement.contains(event.target)) {
        this.doneSearching = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.searchCategories();
  }

  onInputChange(text: string): void {
    this.searchText = text;
    this.searchCategories();
  }

  selectCategory(category: PacifistaShopCategoryDTO): void {
    this.categorySelected = category;
    this.searchText = category.name;
    this.doneSearching = false;
    this.categories = [];
    this.onCategorySelected.emit(category);
  }

  clear(): void {
    this.searchText = '';
    this.categories = [];
    this.doneSearching = false;
    this.categorySelected = null;
    this.onClearSearch.emit();
  }

  searchCategories(): void {
    this.loading = true;
    this.doneSearching = false;

    let queryParam = new QueryParam();
    queryParam.key = 'name';
    queryParam.type = QueryBuilder.startWithIgnoreCase;
    queryParam.value = this.searchText;

    let queryBuilder = new QueryBuilder();
    queryBuilder.addParam(queryParam);

    this.categoryService.find(this.pageOption, queryBuilder).subscribe({
      next: (response) => {
        this.categories = response.content;
        this.loading = false;
        this.doneSearching = true;
      },
      error: (error) => {
        this.notificationService.onErrorRequest(error);
        this.categories = [];
        this.loading = false;
        this.doneSearching = true;
      }
    })
  }

}
