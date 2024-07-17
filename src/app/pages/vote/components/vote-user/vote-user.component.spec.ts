import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VoteUserComponent} from './vote-user.component';

describe('VoteUserComponent', () => {
  let component: VoteUserComponent;
  let fixture: ComponentFixture<VoteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
