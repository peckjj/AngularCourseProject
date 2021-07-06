import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRecipeListComponent } from './f-recipe-list.component';

describe('FRecipeListComponent', () => {
  let component: FRecipeListComponent;
  let fixture: ComponentFixture<FRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRecipeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
