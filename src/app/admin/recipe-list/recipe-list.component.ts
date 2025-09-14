import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';  // <-- fix

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'] // <-- fix (plural)
})
export class RecipeListComponent {

  allRecipes: any[] = [];
  searchRecipe: string = "";

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      this.allRecipes = res;
    });
  }

  removeRecipe(id: string) {
    this.api.deleteRecipeAPI(id).subscribe((res: any) => {
      this.getAllRecipes();
    });
  }

  editRecipe(recipe: any) {
    this.router.navigate(['/admin/recipe/edit', recipe._id]);
  }
}
