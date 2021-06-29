import { ShoppinglistService } from './../shared/services/shoppinglist.service';
import { RecipeService } from './../shared/services/recipe.service';
import { DataStorageService } from './../shared/services/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() onShowRecipes = new EventEmitter<boolean>();

  recipesUnsavedSub: Subscription;
  shoppingListUnsavedSub: Subscription;

  recipesUnsaved = false;
  shoppingListUnsaved = false;

  loadingSub: Subscription;

  isLoading = false;

  constructor(private dss: DataStorageService, private rs: RecipeService, private sls: ShoppinglistService) { }

  ngOnInit(): void {
    this.recipesUnsavedSub = this.rs.unsavedChanged.subscribe(
      (unsaved) => {
        this.recipesUnsaved = unsaved;
      }
    );

    this.shoppingListUnsavedSub = this.sls.unsavedChanged.subscribe(
      (unsaved) => {
        this.shoppingListUnsaved = unsaved;
      }
    );

    this.loadingSub = this.dss.isLoadingChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
  }

  onSaveData() {
    this.dss.storeAll();
  }

  onFetchData() {
    this.dss.fetchAll();
  }

  ngOnDestroy() {
    this.shoppingListUnsavedSub.unsubscribe();
    this.recipesUnsavedSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }

}
