import { Injectable } from '@angular/core';
import {Data} from './data';
import {Datas} from './mock-data';
import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/mergeMap';
@Injectable()
export class DataService {
  private OauthLoginEndPointUrl = 'http://localhost:8080/oauth/token';  // Oauth Login EndPointUrl to web API
  private clientId ='acme';
  private clientSecret ='acmesecret';
  private grant_type = 'client_credentials';
  private data = '';
  constructor(public http: Http) { 
    this.browse();
  }
  // Oauth Check
  Oauth()  {
       let params: URLSearchParams = new URLSearchParams();
        params.set('client_id', this.clientId );
        params.set('client_secret', this.clientSecret );
        params.set('grant_type', this.grant_type );
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    let body = 'grant_type=client_credentials&client_id=acme&client_secret=acmesecret';
    let params1 = new URLSearchParams();
    return this.http.post('http://localhost:8080/oauth/token',  body , {
            headers: headers
          }).map((res: Response) => {
              this.data = res.json().access_token.toString();
              console.log( this.data);
              localStorage.setItem('token-set',  this.data);
       })
  }
   
 // getData():Promise<Data[]>{
   // return Promise.resolve(Datas);
 // }
  // GET THE STORES
   browse(): Observable<any> {
        if(localStorage.getItem('token-set') == null) {
          this.Oauth();
        }
              let data = localStorage.getItem('token-set');
              let headers2: Headers = new Headers();
               headers2.append('Content-Type', 'application/json');
               headers2.append('Authorization', 'Bearer ' + data);
                 let options:RequestOptions ;  
                  options = new RequestOptions({
                  headers: headers2,
                  // Have to make a URLSearchParams with a query string
                
              });
            
            return  this.http.get('http://localhost:8080/rest/api/v1/brands', options ).map((res: Response) => res.json())
              
  }
  // GET THE PRODUCTS
  product(id){
      //let params: URLSearchParams = new URLSearchParams();
        //params.set('client_id',id );
        let url = "http://localhost:8080/rest/api/v1/products/brand/"+ id;
        
       return this.http
        .get(url, {headers: this.getHeaders()}).map((res: Response) => res.json())
       
  }
   private getHeaders(){
    let headers = new Headers();
    let data = localStorage.getItem('token-set');
    headers.append('Authorization', 'Bearer ' + data);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private handleError(error: any){
    let errMsg = "test"
    return Observable.throw(errMsg);
  }
  public abc():void{

  }
 
}
