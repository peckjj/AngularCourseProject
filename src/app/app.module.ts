import { ShoppinglistService } from './shared/services/shoppinglist.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping/shopping-list.component';
import { ShoppingListEditComponent } from './shopping/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { BlankRecipeDetailComponent } from './recipes/blank-recipe-detail/blank-recipe-detail.component';
import { FeaturedRecipesComponent } from './recipes/featured-recipes/featured-recipes.component';
import { FRecipeListComponent } from './recipes/featured-recipes/f-recipe-list/f-recipe-list.component';
import { FBlankRecipeDetailComponent } from './recipes/featured-recipes/f-blank-recipe-detail/f-blank-recipe-detail.component';
import { FRecipeDetailComponent } from './recipes/featured-recipes/f-recipe-detail/f-recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    ShoppingListComponent,
    DropdownDirective,
    RecipeEditComponent,
    BlankRecipeDetailComponent,
    FeaturedRecipesComponent,
    FRecipeListComponent,
    FBlankRecipeDetailComponent,
    FRecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ShoppinglistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
