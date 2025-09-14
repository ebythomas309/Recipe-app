import { Component, OnInit } from '@angular/core';
import { recipeModel } from '../model/recipeModel';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrls: ['./manage-recipe.component.css']
})
export class ManageRecipeComponent implements OnInit {

  recipeDetails: recipeModel = {};
  ingredients: string[] = [];
  instructions: string[] = [];
  mealType: string[] = [];
  editingRecipeId: string | null = null;

  constructor(
    private api: ApiService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check if we are in edit mode
    this.editingRecipeId = this.route.snapshot.paramMap.get("id");

    if (this.editingRecipeId) {
      // ✅ Use getRecipeById (not getSavedRecipeById)
      this.api.getRecipeById(this.editingRecipeId).subscribe({
        next: (res: any) => {
          this.recipeDetails = res;
          this.ingredients = res.ingredients || [];
          this.instructions = res.instructions || [];
          this.mealType = res.mealType || [];
        },
        error: (err) => console.error("Error loading recipe:", err)
      });
    }
  }

  // Add/remove helpers
  addIngredients(value: string) {
    if (value) this.ingredients.push(value);
  }

  addInstruction(value: string) {
    if (value) this.instructions.push(value);
  }

  removeIngredient(value: string) {
    this.ingredients = this.ingredients.filter(item => item !== value);
  }

  removeInstruction(value: string) {
    this.instructions = this.instructions.filter(item => item !== value);
  }

  toggleMealType(event: any, meal: string) {
    if (event.target.checked) {
      if (!this.mealType.includes(meal)) this.mealType.push(meal);
    } else {
      this.mealType = this.mealType.filter(m => m !== meal);
    }
  }

  // Save or update recipe
  saveRecipe() {
    this.recipeDetails.ingredients = this.ingredients;
    this.recipeDetails.instructions = this.instructions;
    this.recipeDetails.mealType = this.mealType;

    if (this.editingRecipeId) {
      // ✅ Update existing recipe with correct API
      this.api.editRecipeAPI(this.editingRecipeId, this.recipeDetails).subscribe({
        next: () => {
          alert("Recipe updated successfully!");
          this.router.navigateByUrl("/admin/recipe-list");
        },
        error: (err) => console.error("Error updating recipe:", err)
      });
    } else {
      // Add new recipe
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next: () => {
          alert("Recipe added successfully!");
          this.router.navigateByUrl("/admin/recipe-list");
        },
        error: (err) => console.error("Error adding recipe:", err)
      });
    }
  }
}
