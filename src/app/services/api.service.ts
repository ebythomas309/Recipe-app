// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
private server_url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): { headers: HttpHeaders } {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('token');
      if (token) headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  // Recipes
  // src/app/services/api.service.ts
  getAllRecipeAPI(page?: number, limit?: number, q?: string, cuisine?: string): Observable<any> {
    let params = new HttpParams();
    if (page) params = params.set('page', String(page));
    if (limit) params = params.set('limit', String(limit));
    if (q) params = params.set('q', q);
    if (cuisine) params = params.set('cuisine', cuisine);

    // use the server route that exists
    return this.http.get(`${this.server_url}/all-recipes`, { params });
  }

  getRecipeById(id: string): Observable<any> {
    // IMPORTANT: match server route /recipe/:id/view
    return this.http.get(`${this.server_url}/recipe/${id}/view`, this.getAuthHeaders());
  }

  viewRecipeAPI(recipeId: string): Observable<any> {
    return this.getRecipeById(recipeId);
  }

  addRecipeAPI(reqBody: any): Observable<any> {
    return this.http.post(`${this.server_url}/add-recipe`, reqBody, this.getAuthHeaders());
  }
  editRecipeAPI(id: string, data: any): Observable<any> {
    return this.http.put(`${this.server_url}/recipe/${id}/edit`, data, this.getAuthHeaders());
  }
  deleteRecipeAPI(id: string): Observable<any> {
    return this.http.delete(`${this.server_url}/recipe/${id}/delete`, this.getAuthHeaders());
  }

  // Saved recipes
  saveRecipeAPI(recipeDetails: any): Observable<any> {
    return this.http.post(`${this.server_url}/recipe/save`, recipeDetails, this.getAuthHeaders());
  }
  getSavedRecipesAPI(): Observable<any> {
    return this.http.get(`${this.server_url}/all-saved/recipe`, this.getAuthHeaders());
  }
  getSavedRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.server_url}/save-recipe/${id}`, this.getAuthHeaders());
  }
  editSavedRecipeAPI(id: string, data: any): Observable<any> {
    return this.http.put(`${this.server_url}/save-recipe/${id}/edit`, data, this.getAuthHeaders());
  }
  removeSaveRecipeAPI(id: string): Observable<any> {
    return this.http.delete(`${this.server_url}/save-recipe/${id}/remove`, this.getAuthHeaders());
  }

  // Downloads
  downloadRecipeAPI(recipeId: string, recipeDetails: any): Observable<any> {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/downloads`, recipeDetails, this.getAuthHeaders());
  }
  // If server returns blob change responseType; left as JSON for now:
  getDownloadAPI(): Observable<any> {
    return this.http.get(`${this.server_url}/recipe/downloads`, this.getAuthHeaders());
  }

  // Auth & testimonials
  registerAPI(reqBody: any): Observable<any> { return this.http.post(`${this.server_url}/register`, reqBody); }
  loginAPI(reqBody: any): Observable<any> { return this.http.post(`${this.server_url}/login`, reqBody); }
  saveTestimonyAPI(reqBody: any): Observable<any> { return this.http.post(`${this.server_url}/add-testimony`, reqBody); }
  getAllTestimonyAPI(): Observable<any> { return this.http.get(`${this.server_url}/all-testimonials`, this.getAuthHeaders()); }
  updateTestimonyAPI(id: string, status: string): Observable<any> { return this.http.put(`${this.server_url}/testimonials/${id}/update`, { status }, this.getAuthHeaders()); }
  getApprovedTestimonyAPI(): Observable<any> { return this.http.get(`${this.server_url}/all-approved-testimonials`); }

  // Users
  getAllUsersAPI(): Observable<any> { return this.http.get(`${this.server_url}/all-users`, this.getAuthHeaders()); }

  // related recipes
  viewRelatedRecipe(cuisine: string): Observable<any> {
    return this.http.get(`${this.server_url}/related-recipe`, { params: new HttpParams().set('cuisine', cuisine), ...this.getAuthHeaders() });
  }
}
