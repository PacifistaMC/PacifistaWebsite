import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAccountInvoicesComponent} from './user-account-invoices.component';

describe('UserAccountInvoicesComponent', () => {
  let component: UserAccountInvoicesComponent;
  let fixture: ComponentFixture<UserAccountInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
