import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
  UserAccountIntegrationsMinecraftAccountCreateNewComponent
} from './user-account-integrations-minecraft-account-create-new.component';

describe('UserAccountIntegrationsMinecraftAccountCreateNewComponent', () => {
  let component: UserAccountIntegrationsMinecraftAccountCreateNewComponent;
  let fixture: ComponentFixture<UserAccountIntegrationsMinecraftAccountCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountIntegrationsMinecraftAccountCreateNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountIntegrationsMinecraftAccountCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
