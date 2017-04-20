import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';
@Injectable()
export class GlobalService {
  public closeCartModel ;
  public refreshtoken: string ;
  //public flagName: boolean = false;
  public Name:string;
  items:any= [];
  public  user :Object;
  public loginStatus = false ;
  showcart:boolean = false ;
  public cartItems:any ;
  public firstName:string;
  public newUser:any;
  public getTotal:number = 0 ;;
  constructor(public http: Http, private router:Router) {

    this.getCart();

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
            if(!orderID){
              orderID = '';
            } 
            //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
             return this.http
                        .post(url, JSON.stringify({ productId: selectsize, quantity: qty  , orderId:  orderID , skuId: sku},) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
		
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
      let retrievedObject = localStorage.getItem('items'),
      ItemTotal = JSON.parse(retrievedObject);
      this.items = ItemTotal ;
      return ItemTotal; 
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
    let url:string = "/boot/private/rest/api/v1/userprofile/account/" + orderId + "/orderDetail";
    return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Get Addresses for a Profile
  getProfileAddresses() {
    let url:string = "/boot/private/rest/api/v1/userprofile/account/addresses";
    return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  // Edit Address of a Profile  
  editAddress(address:any){
    let url:string = "/boot/private/rest/api/v1/userprofile/account/address/edit";
    return this.http.put(url, JSON.stringify(address,) ,  {headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }
  
  // Remove Address from a Profile  
  removeAddress(addressKey:string){
    let url:string = "/boot/private/rest/api/v1/userprofile/account/address/"+ addressKey +"/remove";
    return this.http.delete(url, {headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }

  // Get Profile Address
  getProfileAddress(addressKey:string) {
    let url:string = "/boot/private/rest/api/v1/userprofile/account/address/" + addressKey;
    return this.http.get(url, {headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }

 // Address Address of a Profile  
  addAddress(address:any){
    let url:string = "/boot/private/rest/api/v1/userprofile/account/address/add";
    return this.http.post(url, JSON.stringify(address,),{headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }


  // User registration
  registration(user : any ) {
    let url:string = "/boot/rest/api/v1/account/create";
    return this.http.post(url, JSON.stringify(user,),{headers: this.getHeaders()}  ).map((res: Response) => res.json());
  }

    getLoggedInProfile(){
      this.getProfile()
        .subscribe(
                    response => {
                     this.loginStatus = true;
                     this.user = response ;
                     this.firstName = response.firstName ;
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
  // get all the address
  getAllAddress(orderID){
      let url:string = "/boot/rest/api/v1/shipping/address/savedAddress/" + orderID ;
      return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }

  goTopayment(addressid, orderId){
      let url:string = "/boot/rest/api/v1/shipping/address/set/" + addressid + "/to/" + orderId ;
      return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json());
  }
    // openCart(){
    //   this.closeCartModel = true ;
    //   //return this.cartModal ;

    //   console.log('dasd')

      
    // }

     getorderDetails(orderID ){
       let url:string = "/boot/orderConfirmation/order/" + orderID ;
        return this.http.get(url, {headers: this.getHeaders()}).map((res: Response)=> res.json())
     }
     firstDropDownChanged(){
       alert('fds')
     }

     // Sign Out
      signOutService(){
      this.refreshtoken = '';
      this.loginStatus = false;
      localStorage.removeItem('refresh-token-set');
      localStorage.removeItem('token-set');
      let signoutURL  = '/boot/oauth/logout';
      return this.http.post(signoutURL,  {headers: this.getHeaders()}  ).map((res: Response) => res)
                .subscribe(
                  response =>{
                      this.router.navigate(['/']);
                  }
                )
  }
}
