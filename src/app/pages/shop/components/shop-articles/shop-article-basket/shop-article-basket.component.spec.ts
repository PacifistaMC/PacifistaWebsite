import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopArticleBasketComponent} from './shop-article-basket.component';

describe('ShopArticleBasketComponent', () => {
  let component: ShopArticleBasketComponent;
  let fixture: ComponentFixture<ShopArticleBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopArticleBasketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopArticleBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
