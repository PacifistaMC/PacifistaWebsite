import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopArticleHandlerComponent} from './shop-article-handler.component';

describe('ShopArticleHandlerComponent', () => {
  let component: ShopArticleHandlerComponent;
  let fixture: ComponentFixture<ShopArticleHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopArticleHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopArticleHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
