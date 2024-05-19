import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAccountIntegrationsComponent} from './user-account-integrations.component';

describe('UserAccountIntegrationsComponent', () => {
  let component: UserAccountIntegrationsComponent;
  let fixture: ComponentFixture<UserAccountIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountIntegrationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
