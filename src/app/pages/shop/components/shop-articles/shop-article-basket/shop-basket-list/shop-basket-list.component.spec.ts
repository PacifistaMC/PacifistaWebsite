import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopBasketListComponent} from './shop-basket-list.component';

describe('ShopBasketListComponent', () => {
  let component: ShopBasketListComponent;
  let fixture: ComponentFixture<ShopBasketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopBasketListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopBasketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
