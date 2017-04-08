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
  options = [{id: 1, name:1}, {id: 2, name:2}, {id: 3, name:3}, {id: 4, name:4}, {id: 5, name:5}, {id: 6, name:6}, {id: 7, name:7}, {id: 8, name:8}]
  orderID:string ;
  cartdetails: any ;
  selected : any
  constructor(globalService: GlobalService) {
      this.cartdetails = globalService;
      this.cartTotal = localStorage.getItem('cartTotal') ;
      
   }
  ngAfterViewInit(){
   this.removeCart =  document.getElementById('cart');
   this.removeoverlay = document.getElementById('overlay');
   
  }
  onRepositorySelected(){
    alert('fsd')
  }
  onChange(sku, qty,productId){
       this.orderID = localStorage.getItem('orderId');
       this.cartTotal = localStorage.getItem('cartTotal');
      this.selected = qty ;
      this.cartdetails.addtoCart(sku, qty , this.orderID, productId )
          .subscribe(
            response => {
               console.log(response) ;
               this.cartTotal = response.orderSubTotal;
               localStorage.setItem('cartTotal', this.cartTotal);

            }
          )
  }
  removeProduct(sku, itemID){
      this.orderID = localStorage.getItem('orderId');
      this.cartdetails.removeProduct(sku, itemID, this.orderID)
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
