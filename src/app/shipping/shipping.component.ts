import { Component, OnInit, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';
import { ShippingAddress } from './shippingAddress';

import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  providers: [GlobalService]

})
export class ShippingComponent implements OnInit {
  isValid = false ;
  title: string = 'Second accordion';
  body: string = 'my awesome content';
  items: any;
  orderTotal: any;
  orderID:string ;
  addressess:{};
  public removeCart  :any ;
  public payuform :any ;
  show2Clicked: boolean = false;
  formdisplay:boolean = false;
  address:any = {};
  public  opened = false ;
  public payment = true;
  public hideForm = false ;
  public paymentUrl :string ;
  getOpitons:string
  
  constructor(private dataService: DataService, private globalService: GlobalService, public http: Http, private router:Router) {
    document.getElementById('cart').classList.remove("open");
    document.getElementById('overlay').classList.remove("active");
    document.getElementsByClassName('cart-button')[0].classList.add("hide");
    this.globalService.showcart = true ;
    this.globalService.getLoggedInProfile();
    this.getAddress();
  }

  ngOnInit() {  
    this.getServiceData();
  }

  model = new ShippingAddress();

  submitted = false;

  submitAddress() {
    let addAddressURL: string = '/boot/rest/api/v1/shipping/address/add';
    this.submitted = true;
  
    this.model.orderId = localStorage.getItem('orderId');
    return this.http.post(addAddressURL, JSON.stringify(this.model),  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
                .subscribe(
                  response =>{
                     this.address = response.dataMap.Added_Address;
                     this.address.addressId =  response.dataMap.Added_Address.addressId;
                     this.formdisplay = true ;
                     this.hideForm = false ;
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
  ngAfterViewInit(){
   this.removeCart =  document.getElementById('cart');
   this.payuform = document.getElementById('payuform');
   
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  getServiceData(){
    //this.orderID = JSON.parse(localStorage.getItem('orderId'));
    this.orderID = localStorage.getItem('orderId');
    this.globalService.getOrderSummary(this.orderID)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.items = response.cartItems;
                        this.orderTotal = response.orderSubTotal;
                       // localStorage.setItem('token', response);
                       },
                       error => {
                           if(error.status == 401) {
                            //Remove Token if exists
                            localStorage.removeItem('refresh-token-set');
                            localStorage.removeItem('token-set');
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.globalService.getOrderSummary(this.orderID);
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

  getAddress(){
      this.globalService.getAllAddress(localStorage.getItem('orderId'))
                        .subscribe(response => {
                          console.log(response);
                          this.addressess = response.dataMap.savedAddress;

                        })
  }
  next(event){
    // while ((event = event.parentElement) && !event.classList.contains('accordion'));
    // console.log(event.nextSibling)
    // return event.nextSibling;
      var target = event.target;
      var pElement = target.parentElement.parentElement.parentElement.parentElement.parentElement;
      var pclassAttr = pElement.attributes.class;
      console.log(pclassAttr);
      pclassAttr.style.display = 'none';

  }
  toggle(){
     this.opened = !this.opened;
  }
  isValidForm() {
    return this.isValid;  
  }
  proceedToPayment(){

  }

  showPayment(addressID){
      this.globalService.goTopayment(addressID , localStorage.getItem('orderId'))
                        .subscribe(response => {   
                          console.log(response)
                        })
      
      this.payment = false ;
      this.paymentUrl = "http://www.palletteapart.com/boot/"+  localStorage.getItem('orderId') + "/paynow" ;
      this.payuform.action = this.paymentUrl;
     
  }
  gotoPayment(){
       this.payuform.submit()
  }
}
