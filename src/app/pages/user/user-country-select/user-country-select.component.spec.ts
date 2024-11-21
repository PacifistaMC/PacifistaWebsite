import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCountrySelectComponent} from './user-country-select.component';

describe('UserCountrySelectComponent', () => {
  let component: UserCountrySelectComponent;
  let fixture: ComponentFixture<UserCountrySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCountrySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
