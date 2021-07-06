import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../../../shared/directives/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppinglistService } from '../../../shared/directives/services/shoppinglist.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-f-recipe-detail',
  templateUrl: './f-recipe-detail.component.html',
  styleUrls: ['./f-recipe-detail.component.css']
})
export class FRecipeDetailComponent implements OnInit {

  featuredRecipe: Recipe;

  featuredRecipeId: number;

  timesAddedToShoppingList = 0;

  ingIndex = -1;
  timesIngredientAdded = 0;

  constructor(private sls: ShoppinglistService, private route: ActivatedRoute, private rs: RecipeService, private router: Router) { }

  addToShoppingList() {
    this.sls.addIngredients(this.featuredRecipe.ingredients);
    this.timesAddedToShoppingList++;
  }

  ngOnInit(): void {
    this.featuredRecipeId = this.route.snapshot.params['id'];

    this.featuredRecipe = this.rs.getFeaturedRecipe(this.featuredRecipeId);

    this.route.params.subscribe(
      (params: Params) => {
        this.featuredRecipeId = params['id'];
        if (this.rs.getFeaturedRecipes().length <= this.featuredRecipeId) {
          this.router.navigate(['../'], {relativeTo: this.route});
          return;
        }
        this.featuredRecipe = this.rs.getFeaturedRecipe(this.featuredRecipeId);
      }
    );
  }

  addIngredient(ingredient: Ingredient, index: number) {
    if (this.ingIndex !== index) {
      this.timesIngredientAdded = 0;
    }

    this.ingIndex = index;
    this.timesIngredientAdded++;
    this.sls.addIngredient(ingredient);
  }

  addToRecipes() {
    this.rs.addRecipe(this.featuredRecipe);
  }

  addToRecipesAndShoppingList() {
    this.addToShoppingList();
    this.addToRecipes();
  }

}
