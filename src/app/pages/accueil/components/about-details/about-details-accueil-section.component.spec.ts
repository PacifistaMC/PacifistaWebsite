import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutDetailsAccueilSectionComponent} from './about-details-accueil-section.component';

describe('AboutDetailsComponent', () => {
  let component: AboutDetailsAccueilSectionComponent;
  let fixture: ComponentFixture<AboutDetailsAccueilSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutDetailsAccueilSectionComponent]
    });
    fixture = TestBed.createComponent(AboutDetailsAccueilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
