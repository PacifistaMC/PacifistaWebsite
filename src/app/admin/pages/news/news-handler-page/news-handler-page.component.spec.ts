import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsHandlerPageComponent} from './news-handler-page.component';

describe('NewsHandlerPageComponent', () => {
  let component: NewsHandlerPageComponent;
  let fixture: ComponentFixture<NewsHandlerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsHandlerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsHandlerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
