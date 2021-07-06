import { Ingredient } from '../../ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  unsaved = false;
  unsavedChanged = new Subject<boolean>();

  private ingredients: Ingredient[] = [];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient, notify = true) {
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
    this.unsaved = true;

    // Notify subscribers of change.

    if (notify)
    {
      this.emitChange();
    }

  }

  addIngredients(ingredients: Ingredient[]) {
    if (ingredients) {
      for (let ingredient of ingredients) {
        this.addIngredient(ingredient, false);
      }
      this.emitChange();
    }
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.unsaved = true;
    this.emitChange();
  }

  deleteAllIngredients() {
    this.ingredients = [];
    this.unsaved = true;
    this.emitChange();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.unsaved = true;
    this.emitChange();
  }

  emitChange() {
    this.ingredientsChanged.next(this.ingredients.slice());
    this.unsavedChanged.next(this.unsaved);
  }
}
