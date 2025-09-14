import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
   //http://localhost:4200/admin
  {path:"",component:DashboardComponent},
  //http://localhost:4200/admin/recipe-list
  {path:"recipe-list",component:RecipeListComponent},
  {path:"user-list",component:UsersListComponent},
  {path:"download-list",component:DownloadsComponent},
  {path:"recipe/add",component:ManageRecipeComponent},
  {path:"request-list",component:RequestComponent},
  { path: "recipe/edit/:id", component: ManageRecipeComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
