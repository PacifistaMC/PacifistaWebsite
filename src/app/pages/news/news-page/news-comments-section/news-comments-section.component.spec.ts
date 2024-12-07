import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsCommentsSectionComponent} from './news-comments-section.component';

describe('NewsCommentSectionComponent', () => {
  let component: NewsCommentsSectionComponent;
  let fixture: ComponentFixture<NewsCommentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCommentsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCommentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
