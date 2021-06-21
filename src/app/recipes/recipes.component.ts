import { RecipeService } from './../shared/services/recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  currentRecipeFocus: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => this.currentRecipeFocus = recipe
    );
  }

  setRecipeFocus(recipe: Recipe) {
    this.currentRecipeFocus = recipe;
  }

}
