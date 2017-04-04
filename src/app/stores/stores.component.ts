import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Data} from '../data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'store-app',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers: [DataService]
})
export class StoresComponent implements OnInit {
  stores: Object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getServiceData();
  }
  getServiceData(){
    // this.dataService.getData().then(datas => {
    //   this.a = datas;
    // })
    this.dataService.browse()
        .subscribe(
                       response => {
                        console.log(response) ;
                        this.stores = response.items;
                        localStorage.setItem('token', response);
                
                       },
                       error => {
                        alert(error);
                       }
                     );
  }
}
