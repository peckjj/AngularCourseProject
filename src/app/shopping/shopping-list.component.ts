import { Ingredient } from './../shared/ingredient.model';
import { ShoppinglistService } from './../shared/services/shoppinglist.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];

  ingredientsChangedSub: Subscription;

  constructor(private shoppingService: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientsChangedSub = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.ingredientsChangedSub.unsubscribe();
  }

  onNewIngredient(ingredient: Ingredient) {
    this.shoppingService.addIngredient(ingredient);
  }

}
