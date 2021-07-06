import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FBlankRecipeDetailComponent } from './f-blank-recipe-detail.component';

describe('FBlankRecipeDetailComponent', () => {
  let component: FBlankRecipeDetailComponent;
  let fixture: ComponentFixture<FBlankRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FBlankRecipeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FBlankRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
