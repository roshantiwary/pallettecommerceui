import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../auth.service'; 
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthService, GlobalService]
})
export class RegistrationComponent implements OnInit {

  constructor() {

  }

  close = new EventEmitter();

  onClickedExit() {
      this.close.emit('close');
  }

  ngOnInit() {
  }

  registration(event, username, password, confirmpassword, firstname, lastname){
    event.preventDefault();
    console.log(username + password + confirmpassword + firstname + lastname);
    /*
    let userLogin = this.auth.login(username , password)
                              .subscribe(
                       response => {
                        localStorage.setItem('token-set', response.access_token);
                        localStorage.setItem('refresh-token-set',  response.refreshtoken);
                        this.cartdetails.getLoggedInProfile();
                        this.close.emit('event');
                       },
                       error => {
                        alert(error);
                       }
                     );
    */
    }

}
