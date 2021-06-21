import { ShoppinglistService } from './../../shared/services/shoppinglist.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private shoppingService: ShoppinglistService) { }

  ngOnInit(): void {
  }

  addToShoppingList() {
    for (let ingredient of this.recipe.ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
  }

}
