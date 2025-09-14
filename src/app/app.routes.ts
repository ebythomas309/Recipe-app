import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

export const routes: Routes = [
    //setupp path for admin module
{path:"admin",loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},

{path:"",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"about",component:AboutComponent},
{path:"contact",component:ContactComponent},
{path:"recipes",component:RecipesComponent},
{path:"recipe/:id/view",component:ViewRecipesComponent},
{path:"saved-recipes",component:SavedRecipesComponent},
{path:"**",component:HomeComponent},



];

