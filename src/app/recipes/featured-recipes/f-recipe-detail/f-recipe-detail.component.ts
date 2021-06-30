import { RecipeService } from './../../../shared/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppinglistService } from './../../../shared/services/shoppinglist.service';
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

  constructor(private sls: ShoppinglistService, private route: ActivatedRoute, private rs: RecipeService) { }

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
        this.featuredRecipe = this.rs.getFeaturedRecipe(this.featuredRecipeId);
      }
    );
  }

  addToRecipes() {
    this.rs.addRecipe(this.featuredRecipe);
  }

  addToRecipesAndShoppingList() {
    this.addToShoppingList();
    this.addToRecipes();
  }

}
