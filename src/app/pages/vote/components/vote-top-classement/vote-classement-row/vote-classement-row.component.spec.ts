import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VoteClassementRowComponent} from './vote-classement-row.component';

describe('VoteClassementRowComponent', () => {
  let component: VoteClassementRowComponent;
  let fixture: ComponentFixture<VoteClassementRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteClassementRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteClassementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
