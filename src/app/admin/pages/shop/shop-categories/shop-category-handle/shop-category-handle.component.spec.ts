import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopCategoryHandleComponent} from './shop-category-handle.component';

describe('ShopCategoryHandleComponent', () => {
  let component: ShopCategoryHandleComponent;
  let fixture: ComponentFixture<ShopCategoryHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCategoryHandleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCategoryHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
