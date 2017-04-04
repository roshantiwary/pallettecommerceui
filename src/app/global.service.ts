import { Injectable } from '@angular/core';

import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';
@Injectable()
export class GlobalService {
  public closeCartModel ;
  item:any= [];
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
  addtoCart(sku:string, qty:number, orderID:string ){
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
                        .post(url, JSON.stringify({ productId: sku, quantity: qty  , orderId:  orderID , profileId : '123'},) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
		
	    }
    removeProduct(sku:string, orderID:string){
       let url:string =  "/boot/rest/api/v1/cart/remove/";

       return this.http
                        .post(url, JSON.stringify({ productId: sku, orderId:  orderID , profileId : '123'},) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
    }
    private getHeaders(){
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
	   var retrievedObject =  JSON.parse(localStorage.getItem('items')) || [] ;
	    for(let ii = 0 ; ii < retrievedObject.length; ii++) {
	        var item = parseInt(retrievedObject[ii].quantity);
          console.log(item)
	        count += item;
	    }
		
	    return count;
	}

  // Get Order Summary for Checkout Pages
  getOrderSummary(orderID:string) {
     let url:string = "/boot/rest/api/v1/cart/" + orderID + "/details";
     return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }
    
    // openCart(){
    //   this.closeCartModel = true ;
    //   //return this.cartModal ;

    //   console.log('dasd')

      
    // }
}
