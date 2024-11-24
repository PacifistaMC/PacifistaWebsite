import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsBansConfirmDeleteComponent} from './news-bans-confirm-delete.component';

describe('NewsBansConfirmDeleteComponent', () => {
  let component: NewsBansConfirmDeleteComponent;
  let fixture: ComponentFixture<NewsBansConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsBansConfirmDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsBansConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
