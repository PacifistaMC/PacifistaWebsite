import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutAccueilSectionComponent} from './about-accueil-section.component';

describe('AboutComponent', () => {
  let component: AboutAccueilSectionComponent;
  let fixture: ComponentFixture<AboutAccueilSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutAccueilSectionComponent]
    });
    fixture = TestBed.createComponent(AboutAccueilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
