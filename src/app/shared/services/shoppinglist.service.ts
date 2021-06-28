import { Ingredient } from './../ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();


  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // Capture any duplicate items in a list

    let duplicates = this.ingredients.filter(elem => elem.name.toLowerCase() === ingredient.name.toLowerCase());

    let total = 0;

    // Count the total amount of these duplicates

    for (let dup of duplicates) {
      total += dup.amount;
    }

    // Add new amount to total

    total += ingredient.amount;

    // Remove the duplicates from the list

    this.ingredients = this.ingredients.filter(
      elem => elem.name.toLowerCase() !== ingredient.name.toLowerCase()
    );

    // Add ingredient to the list if amount is not 0

    if (total > 0) {
      this.ingredients.push(new Ingredient(ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1).toLowerCase(), total));
    }

    // Notify subscribers of change.

    this.emitChange();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emitChange();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.emitChange();
  }

  emitChange() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
