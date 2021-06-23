import { EventEmitter, Injectable } from '@angular/core';
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

  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
