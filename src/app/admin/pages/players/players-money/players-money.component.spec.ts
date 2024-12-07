import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayersMoneyComponent} from './players-money.component';

describe('PlayersMoneyComponent', () => {
  let component: PlayersMoneyComponent;
  let fixture: ComponentFixture<PlayersMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersMoneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
