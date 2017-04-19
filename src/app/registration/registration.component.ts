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

  constructor(public globalService: GlobalService) {

  }

  public user: any;
  public status: boolean;
  public message: string;

  close = new EventEmitter();

  onClickedExit() {
      this.close.emit('close');
  }

  ngOnInit() {
  }

  registration(event, username, password, confirmpassword, firstname, lastname){
    event.preventDefault();
    console.log(username + password + confirmpassword + firstname + lastname);
    this.user = { username: username, password: password  , confirmPassword:  confirmpassword , firstName : firstname, lastName: lastname};
    this.globalService.registration(this.user)
        .subscribe(
          response => {
            this.status = response.status;
            this.message = response.message;
            if(this.status == true) {
              this.close.emit('event');
            }
          }
        );
    }

}
