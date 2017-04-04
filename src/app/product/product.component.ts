import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' ;
import { DataService } from '../data.service';
import { GlobalService } from '../global.service';

import {CartComponent} from '../cart/cart.component'
import {Data} from '../data';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [DataService, GlobalService]
})
export class ProductComponent implements OnInit {
 private sub: any;
 id: string;
 products:Object ;
 factoryObj: any ;
 orderID:string ;

 

 public cartResult: any

  constructor(private route: ActivatedRoute, private dataService: DataService, private globalService : GlobalService ) {
    //this.factoryObj  = globalService.getFactory()  ;
    this.orderID = localStorage.getItem('orderId');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

       this.id = params['id']; // (+) converts string 'id' to a number;
   
       this.getProduct(this.id);
    });
  }

  getProduct(ID){
      this.dataService.product(ID)
        .subscribe(
                  response => {
                  console.log(response) ;
                  this.products = response.items;
                  //localStorage.setItem('token', response);
          
                  },
                  error => {
                    this.dataService.Oauth()
                        .subscribe(data => {

                            this.getProduct(this.id);
                        })
                  }
                );
      }

      addTocart(sku:string, quantity: number){
        this.globalService.addtoCart(sku, quantity , this.orderID)
         .subscribe(
                  response => {
                    console.log(response) ;
                    this.cartResult = response.cartItems;
                    this.orderID = response.orderId;
                    var cartTotal = response.orderSubTotal;
                    localStorage.setItem('items', JSON.stringify(this.cartResult));
                    localStorage.setItem('orderId', this.orderID);
                    localStorage.setItem('cartTotal', cartTotal);
                    this.globalService.getTotalCount();
                    //this.cartComponent.getCartItems() ;
                  },
                  error => {
                     this.dataService.Oauth()
                        .subscribe(data => {

                           //this.addTocart(sku:string, quantity: number)
                        })
                   
                  }
                );
      }

}
