// src/app/view-recipes/view-recipes.component.ts
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.css']
})
export class ViewRecipesComponent implements OnDestroy {
  recipeId = '';
  recipe: any = {};
  allRelatedRecipe: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: any) => {
      this.recipeId = params.id;
      if (this.recipeId) this.viewRecipe(this.recipeId);
    });
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  viewRecipe(recipeId: string) {
    console.log('requesting recipe id:', recipeId);
    this.api.getRecipeById(recipeId).subscribe({
      next: (res: any) => {
        this.recipe = res || {};
        console.log('recipe loaded', this.recipe);
        if (this.recipe.cuisine) this.relatedRecipe(this.recipe.cuisine);
      },
      error: (err) => {
        console.error('viewRecipe error', err);
        if (err.status === 0) alert('Network error — is backend running and CORS enabled?');
        else if (err.status === 404) alert('Recipe not found (404).');
        else if (err.status === 401) alert('Unauthorized — please login.');
        else alert('Failed to load recipe. See console.');
      }
    });
  }

  relatedRecipe(cuisine: string) {
    this.api.viewRelatedRecipe(cuisine).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 1) this.allRelatedRecipe = res.filter((r: any) => r.name !== this.recipe.name);
        else this.allRelatedRecipe = [];
      },
      error: (err) => { console.error('relatedRecipe error', err); this.allRelatedRecipe = []; }
    });
  }

  saveRecipe() {
    const { _id, name, cuisine, image } = this.recipe || {};
    if (!_id) return alert('No recipe selected');
    this.api.saveRecipeAPI({ id: _id, name, cuisine, image }).subscribe({
      next: () => alert('Recipe saved'),
      error: (e) => { console.error('save error', e); alert(e?.error || 'Save failed'); }
    });
  }

  downloadRecipe() {
    if (!this.recipeId) return alert('No recipe selected');
    const payload = { name: this.recipe.name, cuisine: this.recipe.cuisine };
    this.api.downloadRecipeAPI(this.recipeId, payload).subscribe({
      next: () => { alert('Server recorded download'); this.generatePDF(); },
      error: (e) => { console.error('download error', e); alert('Download failed (see console)'); }
    });
  }

  generatePDF() {
    if (!this.recipe || !this.recipe.name) return alert('No recipe to export');
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(this.recipe.name, 10, 12);
    pdf.setFontSize(11);
    pdf.text(`Cuisine: ${this.recipe.cuisine || 'N/A'}`, 10, 22);
    const servings = this.recipe.servings ?? 'N/A';
    pdf.text(`Servings: ${servings}`, 10, 28);
    const ingredientsText = Array.isArray(this.recipe.ingredients) ? this.recipe.ingredients.join('\n') : String(this.recipe.ingredients || '');
    const instructionsText = Array.isArray(this.recipe.instructions) ? this.recipe.instructions.join('\n') : String(this.recipe.instructions || '');
    autoTable(pdf, { head: [['Ingredients', 'Instructions']], body: [[ingredientsText, instructionsText]], startY: 40 });
    pdf.save(`${(this.recipe.name || 'recipe').replace(/\s+/g, '_')}.pdf`);
  }
}
