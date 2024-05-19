import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    UserAccountIntegrationsMinecraftAccountComponent
} from './user-account-integrations-minecraft-account.component';

describe('UserAccountIntegrationsMinecraftAcccountComponent', () => {
  let component: UserAccountIntegrationsMinecraftAccountComponent;
  let fixture: ComponentFixture<UserAccountIntegrationsMinecraftAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountIntegrationsMinecraftAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountIntegrationsMinecraftAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
