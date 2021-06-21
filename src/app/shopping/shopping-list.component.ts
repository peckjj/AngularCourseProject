import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onNewIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(elem => elem.name.toLowerCase() !== ingredient.name.toLowerCase());
    this.ingredients.push(ingredient);
  }

}
