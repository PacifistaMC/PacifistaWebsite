import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SocialsAccueilSectionComponent} from './socials-accueil-section.component';

describe('SocialsComponent', () => {
  let component: SocialsAccueilSectionComponent;
  let fixture: ComponentFixture<SocialsAccueilSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialsAccueilSectionComponent]
    });
    fixture = TestBed.createComponent(SocialsAccueilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
