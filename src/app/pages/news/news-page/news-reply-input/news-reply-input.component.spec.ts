import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsReplyInputComponent} from './news-reply-input.component';

describe('NewsReplyInputComponent', () => {
  let component: NewsReplyInputComponent;
  let fixture: ComponentFixture<NewsReplyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsReplyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsReplyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
