import { ShoppinglistService } from './shoppinglist.service';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  isLoadingChanged = new Subject<boolean>();

  constructor(private http: HttpClient, private rs: RecipeService, private sls: ShoppinglistService) { }

  startLoading() {
    this.isLoadingChanged.next(true);
  }

  stopLoading() {
    this.isLoadingChanged.next(false);
  }

  storeRecipes() {
    this.startLoading();
    const recipes = this.rs.getRecipes();
    this.http.put('https://ng-course-project-61442-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
      (response) => {
        console.log(response);
        this.rs.unsavedChanged.next(false);
        this.isLoadingChanged.next(false);
        this.stopLoading();
      }
    );
  }

  storeShoppingList() {
    this.startLoading();
    const sList = this.sls.getIngredients();
    this.http.put('https://ng-course-project-61442-default-rtdb.firebaseio.com/shopping-list.json', sList).subscribe(
      (response) => {
        console.log(response);
        this.sls.unsavedChanged.next(false);
        this.stopLoading();
      }
    );
  }

  storeAll() {
    this.storeRecipes();
    this.storeShoppingList();
  }

  fetchRecipes() {
    this.startLoading();
    this.http.get<Recipe[]>('https://ng-course-project-61442-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(
      (recipes) => {
        return recipes.map(
          recipe => {
            recipe = {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            return recipe;
          }
        );
      }
    ))
    .subscribe(
      (recipes) => {
        this.rs.deleteAllRecipes();
        this.rs.addRecipes(recipes);
        console.log(recipes);
        this.rs.unsavedChanged.next(false);
        this.stopLoading();
      }
    );
  }

  fetchShoppingList() {
    this.startLoading();
    this.http.get<Ingredient[]>('https://ng-course-project-61442-default-rtdb.firebaseio.com/shopping-list.json').subscribe(
      (ingredients) => {
        this.sls.deleteAllIngredients();
        this.sls.addIngredients(ingredients);
        console.log(ingredients);
        this.sls.unsavedChanged.next(false);
        this.stopLoading();
      }
    );
  }

  fetchAll() {
    this.fetchRecipes();
    this.fetchShoppingList();
  }

}
