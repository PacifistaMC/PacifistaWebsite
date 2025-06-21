import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopArticlesComponent} from './shop-articles.component';

describe('ShopArticlesComponent', () => {
  let component: ShopArticlesComponent;
  let fixture: ComponentFixture<ShopArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
