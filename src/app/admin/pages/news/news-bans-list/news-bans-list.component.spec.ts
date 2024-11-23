import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsBansListComponent} from './news-bans-list.component';

describe('NewsBansListComponent', () => {
  let component: NewsBansListComponent;
  let fixture: ComponentFixture<NewsBansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsBansListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsBansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
