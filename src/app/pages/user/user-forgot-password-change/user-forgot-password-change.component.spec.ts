import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserForgotPasswordChangeComponent} from './user-forgot-password-change.component';

describe('UserForgotPasswordChangeComponent', () => {
  let component: UserForgotPasswordChangeComponent;
  let fixture: ComponentFixture<UserForgotPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserForgotPasswordChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserForgotPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
