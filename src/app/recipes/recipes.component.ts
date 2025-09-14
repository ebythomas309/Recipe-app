import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipe/search.pipe';
import {FormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {


  p: number = 1;
  allRecipes:any=[]
  dummyRecipes:any=[]
  searchKey:string=""

  constructor(private api:ApiService,private router:Router){}
  

  ngOnInit(){
    this.getAllRecipes()
  }

   getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
    this.allRecipes=res
    this.dummyRecipes=this.allRecipes
    console.log(this.allRecipes);
    
  })

   }


   filterRecipe(recipeType:string,recipeName:string){
    this.allRecipes=this.dummyRecipes.filter((item:any)=>item[recipeType].includes(recipeName))

   }
 

   viewRecipe(recipeId:string){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl(`/recipe/${recipeId}/view`)
    }else{
      alert("please login to view recipe")
    }
   }

}
