import { Component, OnInit , Input} from '@angular/core';

import { DataService } from '../data.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public getCartData : string ;
  public removeCart  :any ;
  public removeoverlay :any
  cartTotal: string;
  public options: Array<string> = ['1','2','3','4','5','6'];
  orderID:string ;
  selected : any;
 
  private _values1 = ["1", "2", "3"];
  constructor(public globalService: GlobalService) {
      this.cartTotal = localStorage.getItem('cartTotal') ;
      this.globalService.cartItems = this.globalService.getCart() ;
      
   }
  ngAfterViewInit(){
   this.removeCart =  document.getElementById('cart');
   this.removeoverlay = document.getElementById('overlay');   
  }
  onRepositorySelected(value){
    alert('fsd');
    return ;
  }
   
  firstDropDownChanged(val: any) {
    console.log(val);
  }
  onChange(sku, qty,productId){
      this.orderID = localStorage.getItem('orderId');
      this.cartTotal = localStorage.getItem('cartTotal');
      this.selected = qty ;
      this.globalService.addtoCart(sku, qty , this.orderID, productId )
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
      this.globalService.removeProduct(sku, itemID, this.orderID)
          .subscribe(
            response =>{
              var retrievedObject = localStorage.getItem('items'),
              ItemTotal = JSON.parse(retrievedObject);
              this.cartTotal = response.orderSubTotal;
              localStorage.setItem('cartTotal', this.cartTotal);
              localStorage.setItem('items', JSON.stringify(response.cartItems));
              this.globalService.getTotalCount()
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
