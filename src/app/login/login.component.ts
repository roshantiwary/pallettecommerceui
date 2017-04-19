import { Component, OnInit, EventEmitter ,Output } from '@angular/core';
import {AuthService} from '../auth.service'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';
import { GlobalService } from '../global.service';
import { DialogDirective } from "../dialog.directive"; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //public loginStatus = false ;
  constructor(private auth : AuthService, public router: Router, public cartdetails: GlobalService) { 
    this.cartdetails.refreshtoken = JSON.stringify(localStorage.getItem('refresh-token-set'));
   // this.cartdetails.loginStatus = true;                   
  }
  close = new EventEmitter();

  onClickedExit() {
      this.close.emit('close');
  }

  ngOnInit() {
  }

  login(event, username, password){
    event.preventDefault();
    let userLogin = this.auth.login(username , password)
                              .subscribe(
                       response => {
                        this.cartdetails.refreshtoken = response.refresh_token.toString() ;
                        localStorage.setItem('token-set', response.access_token);
                        localStorage.setItem('refresh-token-set',  this.cartdetails.refreshtoken);
                        this.cartdetails.loginStatus = true ;
                       // this.userUpdated.emit(this.loginStatus);
                        this.close.emit('event');
                        this.cartdetails.getLoggedInProfile()
                       },
                       error => {
                        alert(error);
                       }
                     );

    }
  

}
