import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StoresComponent } from './stores/stores.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import {app_routing} from './MainRouting';
import { RoutingComponent } from './routing/routing.component'
import {DataService} from './data.service';
import {AuthService} from './auth.service';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { DialogDirective } from './dialog.directive';
import { AppfooterComponent } from './appfooter/appfooter.component';

@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
     NavComponent,
     ProductComponent,
     LoginComponent,
     DialogDirective,
     CartComponent,
     AppfooterComponent,
   // StoresComponent,
    // FooterComponent,
    // ProductListComponent,
    // CartComponent,
    // RoutingComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    app_routing
  ],
  providers: [DataService ,AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
