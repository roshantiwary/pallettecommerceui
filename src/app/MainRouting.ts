import { RouterModule, Routes } from '@angular/router';
import { StoresComponent }  from './stores/stores.component';
import { NavComponent }  from './nav/nav.component';
import { ProductComponent }  from './product/product.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';


const app_routes: Routes = [
  { path: '',  component: StoresComponent },
  { path: 'product/brands/:id',  component: ProductComponent },
  { path: 'checkout/shipping', component: ShippingComponent},
  { path: 'account/login', component: LoginComponent},
  { path: 'account/profile', component: ProfileComponent},
  { path: 'account/orderhistory', component: OrderhistoryComponent},
  { path: 'account/orderdetail', component: OrderdetailComponent}
];

export const app_routing = RouterModule.forRoot(app_routes); 