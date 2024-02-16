import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopCancelAfterPaymentComponent} from './shop-cancel-after-payment.component';

describe('ShopErrorAfterPaymentComponent', () => {
  let component: ShopCancelAfterPaymentComponent;
  let fixture: ComponentFixture<ShopCancelAfterPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCancelAfterPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopCancelAfterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
