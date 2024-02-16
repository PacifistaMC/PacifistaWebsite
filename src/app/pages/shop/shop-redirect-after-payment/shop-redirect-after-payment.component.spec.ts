import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopRedirectAfterPaymentComponent} from './shop-redirect-after-payment.component';

describe('ShopSuccessPageComponent', () => {
  let component: ShopRedirectAfterPaymentComponent;
  let fixture: ComponentFixture<ShopRedirectAfterPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopRedirectAfterPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopRedirectAfterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
