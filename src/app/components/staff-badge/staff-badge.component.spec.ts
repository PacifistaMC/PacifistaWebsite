import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StaffBadgeComponent} from './staff-badge.component';

describe('StaffBadgeComponent', () => {
  let component: StaffBadgeComponent;
  let fixture: ComponentFixture<StaffBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
