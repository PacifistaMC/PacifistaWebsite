import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAccountInfosPasswordChangeComponent} from './user-account-infos-password-change.component';

describe('UserAccountInfosPasswordChangeComponent', () => {
  let component: UserAccountInfosPasswordChangeComponent;
  let fixture: ComponentFixture<UserAccountInfosPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountInfosPasswordChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountInfosPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
