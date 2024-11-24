import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsCommentRowComponent} from './news-comment-row.component';

describe('NewsCommentRowComponent', () => {
  let component: NewsCommentRowComponent;
  let fixture: ComponentFixture<NewsCommentRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCommentRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCommentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
