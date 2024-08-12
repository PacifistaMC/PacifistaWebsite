import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminNavbarLinkComponent} from './admin-navbar-link.component';

describe('AdminNavbarLinkComponent', () => {
  let component: AdminNavbarLinkComponent;
  let fixture: ComponentFixture<AdminNavbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavbarLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNavbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
