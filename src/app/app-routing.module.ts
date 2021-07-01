import { HanoiComponent } from './hanoi/hanoi.component';
import { FeaturedRecipesComponent } from './recipes/featured-recipes/featured-recipes.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from './shopping/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { BlankRecipeDetailComponent } from './recipes/blank-recipe-detail/blank-recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FBlankRecipeDetailComponent } from './recipes/featured-recipes/f-blank-recipe-detail/f-blank-recipe-detail.component';
import { FRecipeDetailComponent } from './recipes/featured-recipes/f-recipe-detail/f-recipe-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: BlankRecipeDetailComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  {path: 'featured-recipes', component: FeaturedRecipesComponent, children: [
    {path: '', component: FBlankRecipeDetailComponent},
    {path: ':id', component: FRecipeDetailComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'hanoi', component: HanoiComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
