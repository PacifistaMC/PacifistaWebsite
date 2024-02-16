import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopErrorAfterPaymentComponent} from './shop-error-after-payment.component';

describe('ShopErrorAfterPaymentComponent', () => {
  let component: ShopErrorAfterPaymentComponent;
  let fixture: ComponentFixture<ShopErrorAfterPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopErrorAfterPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopErrorAfterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
