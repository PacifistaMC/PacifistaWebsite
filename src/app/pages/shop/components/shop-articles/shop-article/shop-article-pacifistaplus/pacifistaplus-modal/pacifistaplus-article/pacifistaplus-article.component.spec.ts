import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PacifistaplusArticleComponent} from './pacifistaplus-article.component';

describe('PacifistaplusArticleComponent', () => {
  let component: PacifistaplusArticleComponent;
  let fixture: ComponentFixture<PacifistaplusArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacifistaplusArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacifistaplusArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
