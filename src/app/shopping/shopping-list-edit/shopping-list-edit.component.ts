import { Component,
         ElementRef,
         EventEmitter,
         OnInit,
         Output,
         ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameElement: ElementRef;
  @ViewChild('amountInput', {static: false}) amountElement: ElementRef;

  @Output('onNewIngredient') newIngredientEmitter = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient() {
    let name = this.nameElement.nativeElement.value;
    let amount = parseInt(this.amountElement.nativeElement.value);

    if (isNaN(amount)) {
      amount = 0;
    }

    this.newIngredientEmitter.emit(new Ingredient(name, amount));
    this.nameElement.nativeElement.value = "";
    this.amountElement.nativeElement.value = "";
  }

}
