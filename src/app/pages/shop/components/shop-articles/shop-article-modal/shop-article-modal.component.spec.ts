import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopArticleModalComponent} from './shop-article-modal.component';

describe('ShopArticleModalComponent', () => {
  let component: ShopArticleModalComponent;
  let fixture: ComponentFixture<ShopArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopArticleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
