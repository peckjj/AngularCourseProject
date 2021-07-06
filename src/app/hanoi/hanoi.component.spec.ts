import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanoiComponent } from './hanoi.component';

describe('HanoiComponent', () => {
  let component: HanoiComponent;
  let fixture: ComponentFixture<HanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HanoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
