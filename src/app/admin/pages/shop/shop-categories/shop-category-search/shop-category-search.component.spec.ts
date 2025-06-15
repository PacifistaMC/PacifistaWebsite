import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopCategorySearchComponent} from './shop-category-search.component';

describe('ShopCategorySearchComponent', () => {
  let component: ShopCategorySearchComponent;
  let fixture: ComponentFixture<ShopCategorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCategorySearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCategorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
