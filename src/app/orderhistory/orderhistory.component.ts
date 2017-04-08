import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css'],
  providers: [GlobalService]
})
export class OrderhistoryComponent implements OnInit {

  constructor(private dataService: DataService, private globalService: GlobalService, public http: Http, private router:Router) { }

  orders: any;

  ngOnInit() {
    this.getOrders();
  }

getOrders(){
    //this.orderID = JSON.parse(localStorage.getItem('orderId'));
    this.globalService.getOrderHistory()
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.orders = response.orderHistory;
                       },
                       error => {
                           if(error.status == 401) {
                             //Remove Token if exists
                              localStorage.removeItem('refresh-token-set');
                              localStorage.removeItem('token-set');
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.globalService.getOrderHistory();
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
