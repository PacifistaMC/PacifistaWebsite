import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayersSanctionsComponent} from './players-sanctions.component';

describe('PlayersSanctionsComponent', () => {
  let component: PlayersSanctionsComponent;
  let fixture: ComponentFixture<PlayersSanctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersSanctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
