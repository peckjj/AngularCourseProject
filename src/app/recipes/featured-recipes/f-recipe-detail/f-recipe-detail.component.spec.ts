import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRecipeDetailComponent } from './f-recipe-detail.component';

describe('FRecipeDetailComponent', () => {
  let component: FRecipeDetailComponent;
  let fixture: ComponentFixture<FRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRecipeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
