import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' ;
import { DataService } from '../data.service';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import {CartComponent} from '../cart/cart.component'
import {Data} from '../data';
import {ProductPipe} from '../product.pipe'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 private sub: any;
 id: string;
 products:Object ;
 factoryObj: any ;
 orderID:string ;
 selectsize :string = '';


 

 public cartResult: any

  constructor(private route: ActivatedRoute, private dataService: DataService, public globalService : GlobalService, private router:Router) {
    //this.factoryObj  = globalService.getFactory()  ;
    this.orderID = localStorage.getItem('orderId');
    this.globalService.showcart = false;
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
                  this.products = response.productResponse;
                  //localStorage.setItem('token', response);
          
                  },
                  error => {
                     if(error.status == 401) {
                        //Remove Token if exists
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.globalService.getOrderHistory();
                          })
                      } else if(error.status == 403) {
                          //Remove Token if exists
                          localStorage.removeItem('refresh-token-set');
                          localStorage.removeItem('token-set');
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                    this.dataService.Oauth()
                        .subscribe(data => {

                            this.getProduct(this.id);
                        })
                  }
                );
      }

      addTocart(sku:string, quantity: number, selectsize:string){
        this.globalService.isDelayedRunning = true;
        this.globalService.addtoCart(sku, quantity , this.orderID, selectsize)
         .subscribe(
                  response => {
                    this.globalService.isDelayedRunning = false;
                    console.log(response) ;
                    this.cartResult = response.cartItems;
                    this.orderID = response.orderId;
                   // cartTotal = response.orderSubTotal;
                    localStorage.setItem('items', JSON.stringify(this.cartResult));
                    localStorage.setItem('orderId', this.orderID);
                   // localStorage.setItem('cartTotal', cartTotal);
                    this.globalService.getTotal = response.orderSubTotal;
                    this.globalService.cartItems = response.cartItems;
                    //this.cartComponent.getCartItems() ;
                  },
                  error => {
                    //Remove Token if exists
                    localStorage.removeItem('refresh-token-set');
                    localStorage.removeItem('token-set');
                    if(error.status === '401') {
                      console.log("Get new token");
                    } else if(error.status === '403') {
                      console.log("You need to login to access the service");
                    }
                     this.dataService.Oauth()
                        .subscribe(data => {

                           //this.addTocart(sku:string, quantity: number)
                        })
                   
                  }
                );
      }

}
