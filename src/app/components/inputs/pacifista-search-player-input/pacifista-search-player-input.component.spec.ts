import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PacifistaSearchPlayerInputComponent} from './pacifista-search-player-input.component';

describe('PacifistaSearchPlayerInputComponent', () => {
  let component: PacifistaSearchPlayerInputComponent;
  let fixture: ComponentFixture<PacifistaSearchPlayerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacifistaSearchPlayerInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacifistaSearchPlayerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
