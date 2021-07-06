import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private featuredRecipes: Recipe[] = [];// = [
  //   {
  //     name: 'Flan with Grapefruit',
  //     description: 'A delicious custard and caramel treat, with fruity notes to truly make it special.',
  //     imagePath: 'https://assets.bonappetit.com/photos/5a05d34cba9fd6568203c83e/1:1/w_2560%2Cc_limit/flan-with-grapefruit.jpg',
  //     ingredients: [new Ingredient('small grapefruit', 1),
  //                   new Ingredient('cup(s) sugar', 2),
  //                   new Ingredient('large egg', 4),
  //                   new Ingredient('large egg yolk', 5),
  //                   new Ingredient('cup(s) heavy cream', 1),
  //                   new Ingredient('cup(s) whole milk', 1),
  //                   new Ingredient('tsp kosher salt', .25)]
  //   },
  //   {
  //     name: 'Rum-Soaked Fruit and Coconut Crisp Sundaes',
  //     description: 'It only takes a few minutes to turn ripe, in-season berries into a syrupy topping for a not-so-typical summer sundae.',
  //     imagePath: 'https://assets.bonappetit.com/photos/60a3e587e172da2f6ba49adb/1:1/w_1600%2Cc_limit/0621-Rum-Soaked%2520Fruit%2520Sundaes.jpg',
  //     ingredients: [
  //       new Ingredient('pound(s) strawberries', 1),
  //       new Ingredient('oz. raspberries', 12),
  //       new Ingredient('tbsp raw sugar', 6),
  //       new Ingredient('tbsp orange liqueur', 4),
  //       new Ingredient('tsp kosher salt', 4),
  //       new Ingredient('cup(s) unsweetened cocunut flakes', 1),
  //       new Ingredient('cup(s) sliced almonds', 0.5),
  //       new Ingredient('tbsp pure maple syrup', 1),
  //       new Ingredient('pint(s) vanilla ice cream', 2),
  //       new Ingredient('cup(s) whipped cream', 2)
  //     ]
  //   },
  //   {
  //     name: 'Blueberry-Ginger Buckle',
  //     description: "A member of the larger umbrella group of easy fruit desserts, a buckle features tons of fruit barely held together by tender cake. We're talking so much fruit that the cake buckles around it, hence the name.",
  //     imagePath: 'https://assets.bonappetit.com/photos/5f10d7f5c510f35049efde44/16:9/w_2560%2Cc_limit/Basically-Buckle.jpg',
  //     ingredients: [
  //       new Ingredient('tbsp unsalted butter', 8),
  //       new Ingredient('cup(s) raw pecans', 0.5),
  //       new Ingredient('cup(s) all-purpose flour', 2.25),
  //       new Ingredient('cup(s) dark brown sugar', 0.25),
  //       new Ingredient('tsp ground ginger', 0.5),
  //       new Ingredient('tsp kosher salt', 0.75),
  //       new Ingredient('tsp baking powder', 1),
  //       new Ingredient('tsp baking soda', 0.25),
  //       new Ingredient('2" piece ginger', 1),
  //       new Ingredient('cup(s) granulated sugar', 1),
  //       new Ingredient('large egg', 2),
  //       new Ingredient('cup(s) sour cream', 0.5),
  //       new Ingredient('tsp vanilla extract', 1)
  //     ]
  //   }
  // ];

  recipesChanged = new Subject<Recipe[]>();

  featuredRecipesChanged = new Subject<Recipe[]>();

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

  setFeaturedRecipes(recipes: Recipe[]) {
    this.featuredRecipes = recipes;
    this.featuredRecipesChanged.next(recipes);
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
