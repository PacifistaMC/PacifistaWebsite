import {Component, OnInit} from '@angular/core';
import {
    ErrorDto,
    PacifistaShopCategoryDTO,
    PacifistaShopCategoryService
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../../services/notifications/services/NotificationService";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-shop-category-handle',
  standalone: false,
  templateUrl: './shop-category-handle.component.html',
  styleUrl: './shop-category-handle.component.scss'
})
export class ShopCategoryHandleComponent implements OnInit {

  private readonly shopCategoriesService: PacifistaShopCategoryService;

  protected id?: string;

  protected name: string = '';
  protected nameErrors: string[] = [];

  protected description: string = '';
  protected descriptionErrors: string[] = [];

  protected multiPurchase: boolean = false;
  protected multiPurchaseErrors: string[] = [];

  protected loading: boolean = false;
  protected formSent: boolean = false;

  constructor(httpClient: HttpClient,
              private readonly notificationService: NotificationService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {
    this.shopCategoriesService = new PacifistaShopCategoryService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const categoryId = params['id'];
      if (!categoryId) {
        this.router.navigate(['..']);
        return;
      }

      if (categoryId !== 'create') {
        this.id = categoryId;
        this.shopCategoriesService.getById(categoryId).subscribe({
          next: (category) => {
            this.name = category.name;
            this.description = category.description;
            this.multiPurchase = category.multiPurchaseAllowed;
          },
          error: (error: ErrorDto) => {
            if (error.status === 404) {
              this.notificationService.error('Catégorie introuvable');
              this.router.navigate(['..']);
            } else {
              this.notificationService.onErrorRequest(error);
            }
          }
        });
      }
    })
  }

  save(): void {
    this.loading = true;
    this.formSent = false;
    this.nameErrors = [];
    this.descriptionErrors = [];
    this.multiPurchaseErrors = [];

    let dto = new PacifistaShopCategoryDTO(
        this.name,
        this.description,
        this.multiPurchase
    )

    if (this.id) {
      dto.id = this.id;
      this.shopCategoriesService.update(dto).subscribe({
        next: (category) => this.handleSuccess(category),
        error: (error: ErrorDto) => this.handleError(error),
      })
    } else {
      this.shopCategoriesService.create(dto).subscribe({
        next: (category) => this.handleSuccess(category),
        error: (error: ErrorDto) => this.handleError(error),
      })
    }
  }

  private handleSuccess(category: PacifistaShopCategoryDTO): void {
    this.loading = false;
    this.formSent = true;

    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.multiPurchase = category.multiPurchaseAllowed;

    this.notificationService.info('Catégorie sauvegardée avec succès');
    this.activatedRoute.params.subscribe(params => {
      params['id'] = this.id;
    })
  }

  private handleError(error: ErrorDto): void {
    this.loading = false;
    this.formSent = true;

    if (error.status === 400) {
      error.fieldErrors.forEach(fieldError => {
        if (fieldError.field === 'name') {
          this.nameErrors.push(fieldError.message);
        } else if (fieldError.field === 'description') {
          this.descriptionErrors.push(fieldError.message);
        } else if (fieldError.field === 'multiPurchaseAllowed') {
          this.multiPurchaseErrors.push(fieldError.message);
        }
      })
    } else {
      this.notificationService.onErrorRequest(error);
    }
  }

}
