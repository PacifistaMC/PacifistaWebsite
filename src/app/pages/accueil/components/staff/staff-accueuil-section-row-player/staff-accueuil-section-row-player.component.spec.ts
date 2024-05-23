import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StaffAccueuilSectionRowPlayerComponent} from './staff-accueuil-section-row-player.component';

describe('StaffAccueuilSectionRowPlayerComponent', () => {
  let component: StaffAccueuilSectionRowPlayerComponent;
  let fixture: ComponentFixture<StaffAccueuilSectionRowPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAccueuilSectionRowPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffAccueuilSectionRowPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
