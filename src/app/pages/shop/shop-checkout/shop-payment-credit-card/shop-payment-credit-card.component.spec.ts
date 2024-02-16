import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopPaymentCreditCardComponent} from './shop-payment-credit-card.component';

describe('ShopPaymentCreditCardComponent', () => {
  let component: ShopPaymentCreditCardComponent;
  let fixture: ComponentFixture<ShopPaymentCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPaymentCreditCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopPaymentCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
