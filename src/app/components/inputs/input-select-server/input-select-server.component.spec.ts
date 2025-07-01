import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputSelectServerComponent} from './input-select-server.component';

describe('InputSelectServerComponent', () => {
  let component: InputSelectServerComponent;
  let fixture: ComponentFixture<InputSelectServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectServerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSelectServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
