import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAccountInfosComponent} from './user-account-infos.component';

describe('UserComponentAccountComponent', () => {
  let component: UserAccountInfosComponent;
  let fixture: ComponentFixture<UserAccountInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
