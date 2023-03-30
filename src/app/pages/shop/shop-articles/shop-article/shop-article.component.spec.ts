import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopArticleComponent } from './shop-article.component';

describe('ShopArticleComponent', () => {
  let component: ShopArticleComponent;
  let fixture: ComponentFixture<ShopArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
