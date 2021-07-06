import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../../shared/directives/services/recipe.service';
import { ShoppinglistService } from '../../shared/directives/services/shoppinglist.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/directives/services/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeId: number;
  timesAddedToShoppingList = 0;

  ingIndex: {[index: number] : number};

  recipesChangedSub: Subscription;

  constructor(private shoppingService: ShoppinglistService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dss: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];

        if (this.recipeService.getRecipes().length <= this.recipeId) {
          this.dss.waitUntilDoneLoading().then(
            () => {
              if (this.recipeService.getRecipes().length <= this.recipeId) {
                this.router.navigate(["../"], {relativeTo: this.route});
              } else {
                this.recipe = this.recipeService.getRecipe(this.recipeId);
                this.timesAddedToShoppingList = 0;
                this.ingIndex = {};
              }
            }
          );
          return;
        }

        this.recipe = this.recipeService.getRecipe(this.recipeId);
        this.timesAddedToShoppingList = 0;
        this.ingIndex = {};
      }
    );
  }

  addIngredient(ingredient: Ingredient, index: number) {
    if (!this.ingIndex[index]) {
      this.ingIndex[index] = 0;
    }

    this.shoppingService.addIngredient(ingredient);
    this.ingIndex[index]++;
  }

  ngOnDestroy() {
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
  }

  addToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
    this.timesAddedToShoppingList++;
  }

}
