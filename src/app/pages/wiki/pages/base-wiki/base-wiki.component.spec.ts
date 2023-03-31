import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWikiComponent } from './base-wiki.component';

describe('BaseWikiComponent', () => {
  let component: BaseWikiComponent;
  let fixture: ComponentFixture<BaseWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWikiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
