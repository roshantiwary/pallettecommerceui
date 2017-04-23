import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Address } from './address.component';

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.css']
})
export class AddressbookComponent implements OnInit {

addresses : any;
address : any;
AddressFlag:boolean = false ;
submitted:boolean = false;
hideEditAddressForm:boolean = true;
addressess = [] ;
model = new Address();
editAddressModel = new Address();
newAddress = false;

constructor(private dataService: DataService, public globalService: GlobalService, private router:Router) { 

   this.newAddress = false
}


addressKey : string;
  ngOnInit() {
    this.getAllAddress();
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
                        this.globalService.address = response.address;
                        this.AddressFlag = false;
                        this.newAddress = true;
                      //  this.hideAddressForm = true ;
                       // this.hideAddressButton = false;
                       },
                       error => {
                           if(error.status == 401) {
                        // Token has expired Get new token and save it in local storage
                          this.dataService.Oauth()
                          .subscribe(data => {
                             this.globalService.address = this.globalService.addAddress(this.model);
                          })
                      } else if(error.status == 403) {
                        // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']);
                      }
                       }
                     );
  }

  // Get all the Address
    getAddresses(){
      this.globalService.getAllAddress(localStorage.getItem('orderId'))
                        .subscribe(response => {
                          console.log(response);
                          this.globalService.loginStatus = true;
                          this.addressess = response.dataMap.savedAddress;

                        },
                        
                        error => {
                          if(error.status == 500) {
                             this.globalService.loginStatus = false;
                            // this.formdisplay = false ;
                            // Tempory Check for addAddress
                            
                          }              
                    })
  }

  removeAddress(addresKey) {
    this.globalService.removeAddress(addresKey)
        .subscribe(
                       response => {
                        console.log(JSON.stringify(response)) ;
                        console.log(response);
                         var el = document.getElementById(addresKey);
                         el.parentNode.removeChild( el );
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
   // this.hideAddressForm = false ;
    this.AddressFlag = true;
  }

  closeAddressForm(){
     //this.hideAddressForm = true ;
    //this.hideAddressButton = false;
    this.hideEditAddressForm = true;
  }

  showEditAddressForm(addresKey){
   // this.getAddress(addresKey);
    this.hideEditAddressForm = false;
  }
}
