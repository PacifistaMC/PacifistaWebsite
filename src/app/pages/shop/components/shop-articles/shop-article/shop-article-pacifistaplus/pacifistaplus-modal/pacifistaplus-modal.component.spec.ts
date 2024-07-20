import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PacifistaplusModalComponent} from './pacifistaplus-modal.component';

describe('PacifistaplusModalComponent', () => {
  let component: PacifistaplusModalComponent;
  let fixture: ComponentFixture<PacifistaplusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacifistaplusModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacifistaplusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
