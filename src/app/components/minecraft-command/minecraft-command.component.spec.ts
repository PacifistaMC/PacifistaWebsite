import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MinecraftCommandComponent} from './minecraft-command.component';

describe('MinecraftCommandComponent', () => {
  let component: MinecraftCommandComponent;
  let fixture: ComponentFixture<MinecraftCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinecraftCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
