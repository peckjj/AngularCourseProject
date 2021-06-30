import { RecipeService } from './../../../shared/services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-f-recipe-list',
  templateUrl: './f-recipe-list.component.html',
  styleUrls: ['./f-recipe-list.component.css']
})
export class FRecipeListComponent implements OnInit {

  featuredRecipes: Recipe[];

  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
    this.featuredRecipes = this.rs.getFeaturedRecipes();
  }

}
