import { ShoppinglistService } from './shoppinglist.service';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../../ingredient.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  isLoadingChanged = new Subject<boolean>();

  numLoading = 0;

  constructor(private http: HttpClient, private rs: RecipeService, private sls: ShoppinglistService) { }

  startLoading() {
    this.numLoading++;

    if (this.numLoading === 1) {
      this.isLoadingChanged.next(true);
    }
  }

  stopLoading() {
    this.numLoading--;

    if (this.numLoading === 0) {
      this.isLoadingChanged.next(false);
    }
  }

  storeRecipes() {
    this.startLoading();
    const recipes = this.rs.getRecipes();
    this.http.put('https://ng-course-project-61442-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
      (response) => {
        console.log(response);
        this.rs.unsavedChanged.next(false);
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

  fetchFeaturedRecipes() {
    this .startLoading();
    this.http.get<Recipe[]>('https://ng-course-project-61442-default-rtdb.firebaseio.com/featured-recipes.json')
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
        this.rs.setFeaturedRecipes(recipes);
        this.stopLoading();
      }
    );
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
    ,
      (error: Error) => {
        console.error('DataStorageService: ' + error.message);

        if (error.message !== 'recipes is null') {
          alert("Error: " + error.message);
        }
        this.stopLoading();
      }
    );
  }

  fetchShoppingList() {
    this.startLoading();
    this.http.get<Ingredient[]>('https://ng-course-project-61442-default-rtdb.firebaseio.com/shopping-list.json')
    .subscribe(
      (ingredients) => {
        this.sls.deleteAllIngredients();
        this.sls.addIngredients(ingredients);
        console.log(ingredients);
        this.sls.unsavedChanged.next(false);
        this.stopLoading();
      }
    , (error: Error) => {
        console.error("DataStorageService: " + error.message);

        if (error.message !== 'ingredients is null') {
          alert("Error: " + error.message);
        }
        this.stopLoading();
      }
    );
  }

  fetchAll() {
    this.fetchRecipes();
    this.fetchShoppingList();
    this.fetchFeaturedRecipes();
  }

  async waitUntilDoneLoading() {
    if (this.numLoading === 0) {
      return Promise.resolve(null);
    }
    return new Promise(
      (resolve, reject) => {
        let sub = this.isLoadingChanged.subscribe(
          (isLoading) => {
            if (!isLoading) {
              sub.unsubscribe();
              resolve(null);
            }
          }
        );
      }
    );
  }

}
