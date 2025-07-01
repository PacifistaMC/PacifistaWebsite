import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCreateItemBtnTabComponent} from './admin-create-item-btn-tab.component';

describe('AdminCreateItemBtnTabComponent', () => {
  let component: AdminCreateItemBtnTabComponent;
  let fixture: ComponentFixture<AdminCreateItemBtnTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateItemBtnTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateItemBtnTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
