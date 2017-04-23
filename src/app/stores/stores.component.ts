import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Data} from '../data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GlobalService } from '../global.service';
@Component({
  selector: 'store-app',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers: [DataService]
})
export class StoresComponent implements OnInit {
  stores: Object;

  constructor(private dataService: DataService, private router:Router, public globalService: GlobalService) { 

     this.globalService.showcart = false;
  }

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
                    this.stores = response.brands;
                    },
                    error => {
                      if(error.status == 401) {
                        //Remove Token if exists
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.dataService.browse()
                              .subscribe(
                                response => {
                              this.stores = response.brands;
                              },error => {});
                          })
                      } else if(error.status == 403) {
                        //Remove Token if exists
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                    }
                  );
  }
}
