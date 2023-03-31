import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiCardComponent } from './wiki-card.component';

describe('WikiCardComponent', () => {
  let component: WikiCardComponent;
  let fixture: ComponentFixture<WikiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
