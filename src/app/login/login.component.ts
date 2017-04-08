import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../auth.service'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../data.service';
import { GlobalService } from '../global.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, GlobalService]
})
export class LoginComponent implements OnInit {
 
  constructor(private auth : AuthService, public router: Router, public cartdetails: GlobalService) { 

    this.cartdetails.refreshtoken = JSON.stringify(localStorage.getItem('refresh-token-set'));
                       
  }
  close = new EventEmitter();

  onClickedExit() {
      this.close.emit('fds');
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
                        this.close.emit('event');
                       },
                       error => {
                        alert(error);
                       }
                     );

    }
  

}
