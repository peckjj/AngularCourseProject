import { RecipeService } from '../../shared/directives/services/recipe.service';
import { ShoppinglistService } from '../../shared/directives/services/shoppinglist.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeId: number;
  timesAddedToShoppingList = 0;

  recipesChangedSub: Subscription;

  constructor(private shoppingService: ShoppinglistService, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.recipeId = +this.route.snapshot.params['id'];

    this.recipe = this.recipeService.getRecipe(this.recipeId);

    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];

        this.recipe = this.recipeService.getRecipe(this.recipeId);
      }
    );

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        if (recipes.length <= this.recipeId) {
          this.recipe = new Recipe("", "", "", []);
          this.router.navigate(["../"], {relativeTo: this.route});
        } else {
          this.recipe = recipes[this.recipeId];
        }
      }
    );
  }

  ngOnDestroy() {
    this.recipesChangedSub.unsubscribe();
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
  }

  addToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
    this.timesAddedToShoppingList++;
  }

}
