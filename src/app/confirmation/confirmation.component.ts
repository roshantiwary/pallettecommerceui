import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' ;

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  order: any;
  orderId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.order = this.route.params.subscribe(params => {

       this.orderId = params['orderid']; // (+) converts string 'id' to a number;
       console.log(this.orderId);
    });
  }

}
