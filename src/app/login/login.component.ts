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
<<<<<<< HEAD
 
=======

 public firstName: string;

>>>>>>> 0bb78549aa6453db618fbd19c92be784c996dbbc
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
                        localStorage.setItem('token-set', response.access_token);
                        localStorage.setItem('refresh-token-set',  response.refreshtoken);
                        this.cartdetails.getLoggedInProfile();
                        this.close.emit('event');
                       },
                       error => {
                        alert(error);
                       }
                     );

    }
  

}
