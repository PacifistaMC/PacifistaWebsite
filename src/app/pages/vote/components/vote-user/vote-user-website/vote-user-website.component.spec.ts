import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VoteUserWebsiteComponent} from './vote-user-website.component';

describe('VoteUserWebsiteComponent', () => {
  let component: VoteUserWebsiteComponent;
  let fixture: ComponentFixture<VoteUserWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteUserWebsiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteUserWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
