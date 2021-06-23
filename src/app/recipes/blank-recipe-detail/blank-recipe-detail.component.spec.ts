import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankRecipeDetailComponent } from './blank-recipe-detail.component';

describe('BlankRecipeDetailComponent', () => {
  let component: BlankRecipeDetailComponent;
  let fixture: ComponentFixture<BlankRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankRecipeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
