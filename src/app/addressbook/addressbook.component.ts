import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Address } from './address.component';

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.css'],
  providers: [GlobalService]
})
export class AddressbookComponent implements OnInit {

constructor(private dataService: DataService, private globalService: GlobalService, private router:Router) { }

addresses : any;
address : any;
hideAddressForm:boolean = true ;
hideAddressButton:boolean = false;
submitted:boolean = false;

model = new Address();

addressKey : string;
  ngOnInit() {
    this.getAddresses();
  }

  getAddresses(){
    this.globalService.getProfileAddresses()
        .subscribe(
                       response => {
                        this.addresses = response.adressResponse;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.addresses = this.globalService.getProfileAddresses();
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                       }
                     );
  }

  editAddress(addressKey, address) {
    this.globalService.editAddress(address, addressKey)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.addresses = response.adressResponse;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.addresses = this.globalService.editAddress(address, addressKey);
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                       }
                     );
  }

  addAddress() {
    this.submitted = true;
    this.globalService.addAddress(this.model)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.address = response.adressResponse;
                        this.hideAddressForm = true ;
                        this.hideAddressButton = false;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.address = this.globalService.addAddress(this.model);
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                       }
                     );
  }

removeAddress(addresKey) {
 this.globalService.removeAddress(addresKey)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        console.log(response);
                       },
                       error => {
                           if(error.status == 401) {
                              //Remove Token if exists
                          localStorage.removeItem('refresh-token-set');
                          localStorage.removeItem('token-set');
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.globalService.removeAddress(addresKey);
                          })
                      } else if(error.status == 403) {
                         //Remove Token if exists
                          localStorage.removeItem('refresh-token-set');
                          localStorage.removeItem('token-set');
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                       }
                     );
  }

  showAddressForm(){
    this.hideAddressForm = false ;
    this.hideAddressButton = true;
  }

  closeAddressForm(){
     this.hideAddressForm = true ;
    this.hideAddressButton = false;
  }
}
