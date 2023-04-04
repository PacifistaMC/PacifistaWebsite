import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBasketLittleComponent } from './shop-basket-little.component';

describe('ShopBasketLittleComponent', () => {
  let component: ShopBasketLittleComponent;
  let fixture: ComponentFixture<ShopBasketLittleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBasketLittleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopBasketLittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
