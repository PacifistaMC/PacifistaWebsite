import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MinecraftHeadComponent} from './minecraft-head.component';

describe('MinecraftHeadComponent', () => {
  let component: MinecraftHeadComponent;
  let fixture: ComponentFixture<MinecraftHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinecraftHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
