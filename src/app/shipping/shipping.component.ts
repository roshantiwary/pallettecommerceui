import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  providers: [GlobalService]
})
export class ShippingComponent implements OnInit {
  order: Object;
  orderID:string ;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {  
    this.getServiceData();
  }

  getServiceData(){
    //this.orderID = JSON.parse(localStorage.getItem('orderId'));
    this.orderID = "order69";
    this.globalService.getOrderSummary(this.orderID)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.order = response;
                       // localStorage.setItem('token', response);
                       },
                       error => {
                        alert(error);
                       }
                     );
  }
}
