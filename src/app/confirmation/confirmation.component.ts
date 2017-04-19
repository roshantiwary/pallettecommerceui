import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router' ;
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [GlobalService]
})
export class ConfirmationComponent implements OnInit {
   public sub: any;
   orderID:string;
   public confirmationData = {};
   public items:any
  constructor(private route: ActivatedRoute , private globalService: GlobalService,) { }

   ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

       this.orderID = params['orderID']; // (+) converts string 'id' to a number;
   
       this.orderDetails(this.orderID);
    });
  }

  orderDetails(orderID ){
      console.log(orderID)
         this.globalService.getorderDetails(orderID)
          .subscribe(
              response=>{
                console.log(response);
                  localStorage.removeItem('cartTotal');
                  localStorage.removeItem('items');
                  localStorage.removeItem('orderId');
                  this.confirmationData = response;
                  this.items = response.orderItems
              }

          )
  }
}

