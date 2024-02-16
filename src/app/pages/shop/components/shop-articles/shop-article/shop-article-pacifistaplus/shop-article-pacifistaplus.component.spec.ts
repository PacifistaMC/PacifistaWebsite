import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopArticlePacifistaplusComponent} from './shop-article-pacifistaplus.component';

describe('ShopArticlePacifistaplusComponent', () => {
  let component: ShopArticlePacifistaplusComponent;
  let fixture: ComponentFixture<ShopArticlePacifistaplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopArticlePacifistaplusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopArticlePacifistaplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
