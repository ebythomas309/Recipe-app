import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from "@angular/router";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  homeRecipes:any=[]

  allTestimonys:any=[]

  constructor(private api:ApiService){}


  ngOnInit(){
    this.getHomeRecipes()
    this.getAllTestimonys()
   
  }


  getHomeRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.homeRecipes=res.slice(0,6)
      console.log(this.homeRecipes);
      
    })
  }

  getAllTestimonys(){
    this.api.getApprovedTestimonyAPI().subscribe((res:any)=>{
      this.allTestimonys=res
      console.log(this.allTestimonys);
      
      
    })
  }

}
