import { Component, OnInit, ViewChild, Inject, Renderer } from '@angular/core';
import { DialogDirective } from "../dialog.directive"; 
import { LoginComponent } from '../login/login.component';
import { DataService } from '../data.service';
import { GlobalService } from '../global.service';

import { Http , URLSearchParams , Response, Headers , RequestOptions } from '@angular/http';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  entryComponents: [LoginComponent],
  providers:[DataService, GlobalService]
})
export class NavComponent implements OnInit {
  

  public username  = "dads";
  public  openCart: any ;
  public overlay: any;
  @ViewChild(DialogDirective) dialogAnchor: DialogDirective;
  constructor(private dataService: DataService, public cartdetails: GlobalService, public http: Http, private render:Renderer) { 
    this.cartdetails.refreshtoken = localStorage.getItem('refresh-token-set');
    //this.cartdetails = globalService;
  }

  ngOnInit() {
    this.cartdetails.getLoggedInProfile();
  }
  ngAfterViewInit(){
   this.openCart =  document.getElementById('cart');

   this.overlay = document.getElementById('overlay');
  }

  signin(){
    //console.log(this.dialogAnchor)
    
		this.dialogAnchor.createDialog(LoginComponent);
    
	}

  
  signout(){

        this.signOutService();
        this.cartdetails.refreshtoken = '';
        localStorage.removeItem('refresh-token-set');
        localStorage.removeItem('token-set');
  }

   signOutService(){
      let signoutURL : '/boot/oauth/logout';
      return this.http.get(signoutURL,  {headers: this.getHeaders()}  ).map((res: Response) => res.json())
                .subscribe(
                  response =>{
                      console.log(response);
                  }
                )
  }

  private getHeaders(){
          let headers = new Headers();
          let data = localStorage.getItem('token-set');
          headers.append('Authorization', 'Bearer ' + data);
          headers.append('Content-Type', 'application/json');
          return headers;
  }
 
  displayCartFuntion(){
    // this.cartdetails.closeCartModel = true;
    // this.ref.detectChanges();
    // console.log('ew')
    // this.render.setElementClass(this.cartdetails,"open",false);
    this.openCart.classList.add("open");
    this.overlay.classList.add("active");
  }
}
