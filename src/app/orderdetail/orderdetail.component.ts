import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css'],
  providers: [GlobalService]
})
export class OrderdetailComponent implements OnInit {

constructor(private dataService: DataService, private globalService: GlobalService, private router:Router) { }

order: any;
orderId: string;

ngOnInit() {
  this.getOrder(this.orderId);
}

getOrder(orderId) {
  this.globalService.getOrderDetail(orderId)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.order = response;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.globalService.getOrderDetail(orderId);
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['']);
                      }
                       }
                     );
}

}
