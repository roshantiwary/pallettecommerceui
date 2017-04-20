import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../auth.service'; 
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  constructor(public globalService: GlobalService) {

  }

  public user: any;
  public status: boolean;
  public message: string;
  public accessToken: string;
  public refreshToken: string;

  close = new EventEmitter();

  onClickedExit() {
      this.close.emit('close');
  }

  ngOnInit() {
  }

  registration(event, username, password, firstname, lastname, age){
    event.preventDefault();
    this.user = {user:{ emailAddress: username, password: password, firstName : firstname, lastName: lastname, age: age}, password: password};
    this.globalService.registration(this.user)
        .subscribe(
          response => {
            this.status = response.status;
            this.message = response.message;
            this.globalService.newUser = response.apiUser;
            this.globalService.firstName = response.apiUser.firstName;
            this.globalService.loginStatus = true;
            if(this.status == true) {
              localStorage.setItem('token-set', response.oauth2AccessToken.access_token);
              localStorage.setItem('refresh-token-set', response.oauth2AccessToken.refresh_token);
              this.close.emit('event');
            }
          }
        );
    }

}
