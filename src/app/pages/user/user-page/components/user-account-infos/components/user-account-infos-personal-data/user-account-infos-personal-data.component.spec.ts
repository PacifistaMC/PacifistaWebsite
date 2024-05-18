import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAccountInfosPersonalDataComponent} from './user-account-infos-personal-data.component';

describe('UserAccountInfosPersonalDataComponent', () => {
  let component: UserAccountInfosPersonalDataComponent;
  let fixture: ComponentFixture<UserAccountInfosPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountInfosPersonalDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountInfosPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
