import { RecipeService } from '../../shared/directives/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  getFormArray(): FormArray {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  getFormControls() {
    return this.getFormArray().controls;
  }

  onSubmit() {
    const newRecipe = new Recipe(this.recipeForm.value['name'],
                                 this.recipeForm.value['description'],
                                 this.recipeForm.value['imagePath'],
                                 this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = "";
    let recipeImage = "";
    let recipeDesc = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$|^[0-9]*\.[0-9]*[1-9]$/)])
          }));
        }
      }
    }


    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'imagePath': new FormControl(recipeImage, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onDeleteIngredientFromRecipe(index: number) {
    this.getFormArray().removeAt(index);
  }

  onAddIngredient() {
    this.getFormArray().push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

}
