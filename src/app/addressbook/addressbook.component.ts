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
hideEditAddressForm:boolean = true;

model = new Address();
editAddressModel = new Address();

addressKey : string;
  ngOnInit() {
    this.getAllAddress();
  }

 getAddress(addressKey){
    this.globalService.getProfileAddress(addressKey)
        .subscribe(
                       response => {
                        this.editAddressModel = response;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.addresses = this.globalService.getProfileAddress(addressKey);
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                       }
                     );
  }

  getAllAddress(){
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

  editAddress(addressKey) {
    this.editAddressModel.id = addressKey;
    this.globalService.editAddress(this.editAddressModel)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        this.addresses = response.adressResponse;
                        this.hideEditAddressForm = true;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.addresses = this.globalService.editAddress(this.editAddressModel);
                             this.hideEditAddressForm = true;
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

  signout(){
    this.globalService.signOutService();  
  }

  showAddressForm(){
    this.hideAddressForm = false ;
    this.hideAddressButton = true;
  }

  closeAddressForm(){
     this.hideAddressForm = true ;
    this.hideAddressButton = false;
    this.hideEditAddressForm = true;
  }

  showEditAddressForm(addresKey){
    this.getAddress(addresKey);
    this.hideEditAddressForm = false;
  }
}
