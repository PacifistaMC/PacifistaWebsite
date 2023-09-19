import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeAccueilSectionComponent} from './welcome-accueil-section.component';

describe('WelcomeComponent', () => {
  let component: WelcomeAccueilSectionComponent;
  let fixture: ComponentFixture<WelcomeAccueilSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeAccueilSectionComponent]
    });
    fixture = TestBed.createComponent(WelcomeAccueilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
