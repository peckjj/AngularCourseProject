import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private featuredRecipes: Recipe[] = [
    {
      name: 'Flan with Grapefruit',
      description: 'A delicious custard and caramel treat, with a fruity notes to truly make it special.',
      imagePath: 'https://assets.bonappetit.com/photos/5a05d34cba9fd6568203c83e/1:1/w_2560%2Cc_limit/flan-with-grapefruit.jpg',
      ingredients: [new Ingredient('small grapefruit', 1),
                    new Ingredient('cups of sugar', 2),
                    new Ingredient('large eggs', 4),
                    new Ingredient('large egg yolks', 5),
                    new Ingredient('cups of heavy cream', 1),
                    new Ingredient('cups of whole milk', 1),
                    new Ingredient('tsp of kosher salt', .25)]
    },
    {
      name: 'Rum-Soaked Fruit and Coconut Crisp Sundaes',
      description: 'It only takes a few minutes to turn ripe, in-season berries into a syrupy topping for a not-so-typical summer sundae.',
      imagePath: 'https://assets.bonappetit.com/photos/60a3e587e172da2f6ba49adb/1:1/w_1600%2Cc_limit/0621-Rum-Soaked%2520Fruit%2520Sundaes.jpg',
      ingredients: [
        new Ingredient('pound of strawberries, hulles, quartered', 1),
        new Ingredient('oz. of raspberries', 12),
        new Ingredient('tbsp of raw sugar', 6),
        new Ingredient('tbsp of orange liqueur', 4),
        new Ingredient('tsp of kosher salt', 4),
        new Ingredient('cup of unsweetened cocunut flakes', 1),
        new Ingredient('cup of sliced almonds', 0.5),
        new Ingredient('tbsp of pure maple syrup', 1),
        new Ingredient('pints of vanilla ice cream', 2),
        new Ingredient('cups of whipped cream', 2)
      ]
    }
  ];

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

  getFeaturedRecipes() {
    return this.featuredRecipes.slice();
  }

  getFeaturedRecipe(id: number) {
    return this.featuredRecipes[id];
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
