import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopPaymentPaysafecardComponent} from './shop-payment-paysafecard.component';

describe('ShopPaymentPaysafecardComponent', () => {
  let component: ShopPaymentPaysafecardComponent;
  let fixture: ComponentFixture<ShopPaymentPaysafecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPaymentPaysafecardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopPaymentPaysafecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
