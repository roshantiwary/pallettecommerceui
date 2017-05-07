import { Injectable } from '@angular/core';
import { Http , URLSearchParams , Response  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AuthService {
  private OauthLoginEndPointUrl = 'http://www.palletteapart.com/boot/oauth/token';  // Oauth Login EndPointUrl to web API
  private clientId ='acme';
  private clientSecret ='acmesecret';
  private grant_type = 'client_credentials';
  isAuthenticated: boolean  =false ;
  constructor(private http: Http) { }

  login(username, password) {
     let params: URLSearchParams = new URLSearchParams();
     params.set('username', username );
     params.set('password', password );
     params.set('client_id', this.clientId );
     params.set('client_secret', this.clientSecret );
     params.set('grant_type', 'password' );

    return this.http.get(this.OauthLoginEndPointUrl , {
                   search: params
                 }).map(this.handleData)
                   
  }
  private handleData(res: Response) {
    let body = res.json();
    return body;
  }
 

}
