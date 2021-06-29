import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  recipeSelected = new Subject<Recipe>();

  unsaved = false;

  unsavedChanged = new Subject<boolean>();

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.unsaved = true;
    this.emitChange();
  }

  addRecipes(recipes: Recipe[]) {
    this.recipes.push(...recipes);
    this.unsaved = true;
    this.emitChange();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.unsaved = true;
    this.emitChange();
  }

  emitChange() {
    this.recipesChanged.next(this.recipes.slice());
    this.unsavedChanged.next(this.unsaved);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.unsaved = true;
    this.emitChange();
  }

  deleteAllRecipes() {
    this.recipes = [];
    this.unsaved = true;
    this.emitChange();
  }
}
