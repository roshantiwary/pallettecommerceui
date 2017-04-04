import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../auth.service'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
 
  constructor(private auth : AuthService, public router: Router) { }
  public refreshtoken : string ;
  close = new EventEmitter();

    onClickedExit() {
        this.close.emit('event');
    }

  ngOnInit() {
  }

  login(event, username, password){
    event.preventDefault();
    let userLogin = this.auth.login(username , password)
                              .subscribe(
                       response => {
                        this.refreshtoken = response.refresh_token.toString() ;
                       localStorage.setItem('refresh-token-set',  this.refreshtoken);
                        this.close.emit('event');
                       },
                       error => {
                        alert(error);
                       }
                     );

    }
  

}
