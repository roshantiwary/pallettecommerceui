import { Component, OnInit, ViewChild, Inject, Renderer } from '@angular/core';

import { DialogDirective } from "../dialog.directive"; 
import { LoginComponent } from '../login/login.component';

import { DataService } from '../data.service';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  entryComponents: [LoginComponent],
  providers:[DataService, GlobalService]
})
export class NavComponent implements OnInit {
  


  public  openCart: any ;
  public overlay: any
  @ViewChild(DialogDirective) dialogAnchor: DialogDirective;
  constructor(public cartdetails: GlobalService, private render:Renderer) { 
    this.cartdetails.refreshtoken = localStorage.getItem('refresh-token-set');
    //this.cartdetails = globalService;
  }

  ngOnInit() {
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
        this.cartdetails.refreshtoken = '';
        localStorage.removeItem('refresh-token-set');
        localStorage.removeItem('token-set');
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
