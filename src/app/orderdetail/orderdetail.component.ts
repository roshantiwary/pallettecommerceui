import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router' ;

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css'],
  providers: [GlobalService]
})
export class OrderdetailComponent implements OnInit {

constructor(private route: ActivatedRoute, private dataService: DataService, private globalService: GlobalService, private router:Router) { }

order: any;
orderId: string;

ngOnInit() {
   this.order = this.route.params.subscribe(params => {

       this.orderId = params['orderid']; // (+) converts string 'id' to a number;
   
       this.getOrder(this.orderId);
    });
}

getOrder(orderId) {
  this.globalService.getOrderDetail(orderId)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.order = response;
                       },
                       error => {
                        //Remove Token if exists
                      if(error.status == 401) {
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                              this.globalService.getOrderDetail(orderId);
                          })
                      } else if(error.status == 403) {
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['']);

                      }
                       }
                     );
}

}
