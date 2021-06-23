import { RecipeService } from './../../shared/services/recipe.service';
import { ShoppinglistService } from './../../shared/services/shoppinglist.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  timesAddedToShoppingList = 0;

  constructor(private shoppingService: ShoppinglistService, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let recipeId: number = +this.route.snapshot.params['id'];

    this.recipe = this.recipeService.getRecipes()[recipeId];

    this.route.params.subscribe(
      (params: Params) => {
        let newID: number = +params['id'];

        this.recipe = this.recipeService.getRecipes()[newID];
      }
    );
  }

  addToShoppingList() {
    for (let ingredient of this.recipe.ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
    this.timesAddedToShoppingList++;
  }

}
