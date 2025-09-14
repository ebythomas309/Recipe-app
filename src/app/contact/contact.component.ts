import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  demoMail:string="dishdelight@gmail.com"
  testimonyForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService){
    this.testimonyForm=this.fb.group({
      name:[''],
      email:[''],
      message:['']
    })
  }


  submitTestimony(){
    const name = this.testimonyForm.value.name
    const email = this.testimonyForm.value.email
    const message = this.testimonyForm.value.message


    if(name && email && message){
      //api call
      this.api.saveTestimonyAPI({name,email,message}).subscribe((res:any)=>{
        alert("thank you for your valuable response")
        this.testimonyForm.reset()
      })

    }else{
      alert("please fill the missing fields")
    }
  }


}
