import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a test',
      'https://live.staticflickr.com/8397/29578087136_d4d10eb198_b.jpg',
      [new Ingredient('Meat', 1),
       new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'A Test Recipe2',
      'This is a test2',
      'https://upload.wikimedia.org/wikipedia/commons/9/93/Hospital_food_NY.jpg',
      [new Ingredient('Buns', 2),
       new Ingredient('Meat', 1)]
    ),
  ];

  recipesChanged = new Subject<Recipe[]>();

  recipeSelected = new Subject<Recipe>();

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitChange();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.emitChange();
  }

  emitChange() {
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitChange();
  }
}
