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

  constructor(private dataService: DataService, private router:Router) { }

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
                    this.stores = response.items;
                    localStorage.setItem('token', response);
                    },
                    error => {
                      if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.dataService.browse()
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['ShippingComponent']); 
                      }
                    }
                  );
  }
}
