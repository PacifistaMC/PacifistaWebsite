import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VoteTopClassementComponent} from './vote-top-classement.component';

describe('VoteTopClassementComponent', () => {
  let component: VoteTopClassementComponent;
  let fixture: ComponentFixture<VoteTopClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteTopClassementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteTopClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
