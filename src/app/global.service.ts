import { Injectable } from '@angular/core';

import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';
@Injectable()
export class GlobalService {
  public closeCartModel ;
  public refreshtoken: string ;
  public firstName: string;
  item:any= [];
  showcart:boolean = false ;
  constructor(public http: Http) {

    this.getLocalStorage();

   }
   getLocalStorage(){
		var retrievedObject = localStorage.getItem('items');
		let ItemTotal = JSON.parse(retrievedObject);
		if(ItemTotal !=  null) {
			this.item = ItemTotal ;
		}
		//
		return ItemTotal; 
	}
  addtoCart(selectsize:string, qty:number, orderID:string, sku:string ){
            let url:string;
            if(qty>1){
               url = "/boot/rest/api/v1/cart/update/";
            }else{
                url = "/boot/rest/api/v1/cart/add/";
            }
           
            let params: URLSearchParams = new URLSearchParams();
            params.set('sku', sku );
            params.set('qty', qty.toString() );
            params.set('orderId', orderID);
            params.set('profileId', '123' );

            if(!orderID){
              orderID = '';
            } 
            //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
             return this.http
                        .post(url, JSON.stringify({ productId: selectsize, quantity: qty  , orderId:  orderID , profileId : '123', skuId: sku},) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
		
	    }
    removeProduct(sku:string, itemID, orderID:string){
       let url:string =  "/boot/rest/api/v1/cart/remove/";

       return this.http
                        .post(url, JSON.stringify({ skuId: sku, productId: itemID, orderId:  orderID , profileId : '123'},) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
    }
    public getHeaders(){
            let headers = new Headers();
            let data = localStorage.getItem('token-set');
            headers.append('Authorization', 'Bearer ' + data);
            headers.append('Content-Type', 'application/json');
            return headers;
    }
    loadItemLocalStorage(){
      var retrievedObject = localStorage.getItem('items'),
      ItemTotal = JSON.parse(retrievedObject);
      let LocalQty : number = 0 ;
      
      if(ItemTotal != null) {
        for (let i=0; i<ItemTotal.length ; i++){
      
          LocalQty = parseInt(ItemTotal[i].quantity) + Number(LocalQty)
        };
        //this.item = ItemTotal ;
        return LocalQty ;
      }
    }
    getCart(){
      var retrievedObject = localStorage.getItem('items'),
      ItemTotal = JSON.parse(retrievedObject);
      if(ItemTotal !=  null) {
        //this.item = ItemTotal ;
      }
      //
      return ItemTotal; 
    }

    getTotalCount(){
	    var count:  number = 0;

	   var retrievedObject =  JSON.parse(localStorage.getItem('items')) || [];

	    for(let ii = 0 ; ii < retrievedObject.length; ii++) {
	        var item = parseInt(retrievedObject[ii].quantity);
          console.log(item)
	        count += item;
	    }
		
	    return count;
	}

  // Get Logged-In Profile for Account Pages
  getProfile() {
     let url:string = "/boot/private/rest/api/v1/userprofile/user";
     return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Get Order Summary for Checkout Pages
  getOrderSummary(orderID:string) {
     let url:string = "/boot/rest/api/v1/cart/" + orderID + "/details";
     return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Get Order History for a Profile
  getOrderHistory() {
    let url:string = "/boot/private/rest/api/v1/userprofile/account/orders";
    return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Get Order Detail
  getOrderDetail(orderId:string) {
    let url:string = "/boot/private/rest/api/v1/userprofile/account/{orderId}/orderDetail";
    return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Get Addresses for a Profile
  getProfileAddresses() {
    let url:string = "/boot/private/rest/api/v1/userprofile/account/addresses";
    return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Edit Address of a Profile  
  editAddress(address:any, addressKey:string){
    let url:string = "/boot/private/rest/api/v1/userprofile/account/editAddress/" + {addressKey};
    return this.http.post(url, JSON.stringify(address,) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }
  
  // Remove Address from a Profile  
  removeAddress(addressKey:string){
    let url:string = "/boot/private/rest/api/v1/userprofile/account/removeAddress/" + {addressKey};
    return this.http.post(url, {headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }

 // Address Address of a Profile  
  addAddress(address:any){
    let url:string = "/boot/private/rest/api/v1/userprofile/account/addresses/";
    return this.http.post(url, JSON.stringify(address,),{headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }

    getLoggedInProfile(){
      this.getProfile()
        .subscribe(
                    response => {
                     this.firstName = response.firstName;
                    },
                    error => {
                      if(error.status == 401) {
                        console.log("Token has expired Get new token and save it in local storage");
                    // Token has expired Get new token and save it in local storage
                      } else if(error.status == 403) {
                        console.log("Need to get authorized token to access the service, redirect to login page");
                      // Need to get authorized token to access the service, redirect to login page
                      }                   
                    }
                  );
  }
    // openCart(){
    //   this.closeCartModel = true ;
    //   //return this.cartModal ;

    //   console.log('dasd')

      
    // }
}
