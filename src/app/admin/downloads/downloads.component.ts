import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.css'
})
export class DownloadsComponent {

  allDownloads:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownloads()
  }

  getAllDownloads(){
    this.api.getDownloadAPI().subscribe((res:any)=>{
      this.allDownloads=res
      console.log(this.allDownloads);
      
    })
  }

}
