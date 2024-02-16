import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopPaymentPaypalComponent} from './shop-payment-paypal.component';

describe('ShopPaymentPaypalComponent', () => {
  let component: ShopPaymentPaypalComponent;
  let fixture: ComponentFixture<ShopPaymentPaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPaymentPaypalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopPaymentPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
