import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output("onSelectRecipe") recipeEmitter = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("A Test Recipe","This is a test","https://live.staticflickr.com/8397/29578087136_d4d10eb198_b.jpg"),
    new Recipe("A Test Recipe2","This is a test2","https://upload.wikimedia.org/wikipedia/commons/9/93/Hospital_food_NY.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipe(recipe: Recipe) {
    this.recipeEmitter.emit(recipe);
  }

}
