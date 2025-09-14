import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {

  allRecipe:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getSavedRecipes()
  }

  getSavedRecipes(){
    this.api.getSavedRecipesAPI().subscribe((res:any)=>{
      this.allRecipe=res
      console.log(this.allRecipe);
      
    })
  }

  removeRecipe(id:string){
    this.api.removeSaveRecipeAPI(id).subscribe((res:any)=>{
      console.log(res);
      this.getSavedRecipes()
      
    })
  }

}
