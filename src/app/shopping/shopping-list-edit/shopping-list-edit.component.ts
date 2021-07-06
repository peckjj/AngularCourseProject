import { ShoppinglistService } from '../../shared/directives/services/shoppinglist.service';
import { Component,
         EventEmitter,
         OnDestroy,
         OnInit,
         Output,
         ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @Output('onNewIngredient') newIngredientEmitter = new EventEmitter<Ingredient>();

  @ViewChild('f', {static: false}) slForm: NgForm;

  editMode = false;

  editedItemIndex: number;
  editedItem: Ingredient;

  startedEditingSubscription: Subscription;

  constructor(private shoppingListService: ShoppinglistService) { }

  ngOnInit(): void {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (ingredientIndex: number) => {
        this.editMode = true;
        this.editedItemIndex = ingredientIndex;
        this.editedItem = this.shoppingListService.getIngredient(ingredientIndex);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  clearList() {
    this.shoppingListService.deleteAllIngredients();
  }

  onSubmit(form: NgForm) {

    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);

    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex , newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
}
