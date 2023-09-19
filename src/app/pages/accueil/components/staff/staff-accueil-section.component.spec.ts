import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StaffAccueilSectionComponent} from './staff-accueil-section.component';

describe('StaffComponent', () => {
  let component: StaffAccueilSectionComponent;
  let fixture: ComponentFixture<StaffAccueilSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAccueilSectionComponent]
    });
    fixture = TestBed.createComponent(StaffAccueilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
