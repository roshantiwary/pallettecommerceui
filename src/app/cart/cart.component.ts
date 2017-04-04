import { Component, OnInit , Input} from '@angular/core';

import { DataService } from '../data.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[DataService, GlobalService]
})
export class CartComponent implements OnInit {
  public getCartData : string ;
  public removeCart  :any ;
  public removeoverlay :any
  cartTotal: string;
  cartnumber: Array<number> = [1,2,3,4,5,6,7,8,9];
  orderID:string ;
  cartdetails: any ;
  constructor(globalService: GlobalService) {
      this.cartdetails = globalService;
      this.cartTotal = localStorage.getItem('cartTotal') ;
      
   }
  ngAfterViewInit(){
   this.removeCart =  document.getElementById('cart');
   this.removeoverlay = document.getElementById('overlay');
   
  }
  AddItemtoCart(sku, qty){
       this.orderID = JSON.parse(localStorage.getItem('orderId'));
       this.cartTotal = JSON.parse(localStorage.getItem('cartTotal'));
      
      this.cartdetails.addtoCart(sku, qty , this.orderID)
          .subscribe(
            response => {
               console.log(response) ;
               this.cartTotal = response.orderSubTotal;
               localStorage.setItem('cartTotal', this.cartTotal);

            }
          )
  }
  removeProduct(itemID){
       this.orderID = localStorage.getItem('orderId');
      this.cartdetails.removeProduct(itemID, this.orderID)
          .subscribe(
            response =>{
              var retrievedObject = localStorage.getItem('items'),
              ItemTotal = JSON.parse(retrievedObject);
              this.cartTotal = response.orderSubTotal;
              localStorage.setItem('cartTotal', this.cartTotal);
              localStorage.setItem('items', JSON.stringify(response.cartItems));
              this.cartdetails.getTotalCount()
              for (let i=0; i < ItemTotal.length ; i++){
                if(ItemTotal[i].productId === itemID){
                  ItemTotal.splice(i, 1);
                  var el = document.getElementById(itemID);
                  el.parentNode.removeChild( el );
                  this.SetLocalStorage(ItemTotal);
                }
              };	
              
            }
          )
  }
  SetLocalStorage(item:Object){
		localStorage.setItem('items', JSON.stringify(item));
	}

  ngOnInit() {
  }
  //  getStyle() {
  //   if(this.cartDisplay){
  //     return flex;
  //   } else {
  //     return "";
  //   }
  // }
  closeCart(){
   this.removeCart.classList.remove("open");
  this.removeoverlay.classList.remove("active");
   
  }
}
