import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategoriesComponent } from './shop-categories.component';

describe('ShopCategoriesComponent', () => {
  let component: ShopCategoriesComponent;
  let fixture: ComponentFixture<ShopCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
