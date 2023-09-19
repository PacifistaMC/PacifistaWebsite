import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsAccueilSectionComponent} from './news-accueil-section.component';

describe('NewsComponent', () => {
  let component: NewsAccueilSectionComponent;
  let fixture: ComponentFixture<NewsAccueilSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsAccueilSectionComponent]
    });
    fixture = TestBed.createComponent(NewsAccueilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
