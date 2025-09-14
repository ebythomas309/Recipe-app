import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {

allRequest:any=[]

constructor(private api:ApiService){}

ngOnInit(){
  this.getAllRequest()
  
}

getAllRequest(){
  this.api.getAllTestimonyAPI().subscribe((res:any)=>{
    this.allRequest=res
    console.log(this.allRequest);
    
  })
}

updateTestimony(id:string,status:string){
  this.api.updateTestimonyAPI(id,status).subscribe((res:any)=>{
    this.allRequest=res
    this.getAllRequest()
  })
}

}
