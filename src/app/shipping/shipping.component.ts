import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { ShippingAddress } from './shippingAddress';
import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  providers: [GlobalService]
})
export class ShippingComponent implements OnInit {
  items: any;
  orderTotal: any;
  orderID:string ;
  constructor(private globalService: GlobalService, public http: Http) { }

  ngOnInit() {  
    this.getServiceData();
  }

  model = new ShippingAddress();

  submitted = false;

  submitAddress() {
    let addAddressURL: string = '/boot/rest/api/v1/shipping/address/add';
    this.submitted = true;
    this.orderID = "order69";
    this.model.orderId = this.orderID;
    return this.http.post(addAddressURL, JSON.stringify(this.model),  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
                .subscribe(
                  response =>{
                      console.log(response);
                  }
                )
	}
  private getHeaders(){
          let headers = new Headers();
          let data = localStorage.getItem('token-set');
          headers.append('Authorization', 'Bearer ' + data);
          headers.append('Content-Type', 'application/json');
          return headers;
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  getServiceData(){
    //this.orderID = JSON.parse(localStorage.getItem('orderId'));
    this.orderID = "order69";
    this.globalService.getOrderSummary(this.orderID)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.items = response.cartItems;
                        this.orderTotal = response.orderSubTotal;
                       // localStorage.setItem('token', response);
                       },
                       error => {
                        alert(error);
                       }
                     );
  }
}
