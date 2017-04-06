import { RouterModule, Routes } from '@angular/router';
import { StoresComponent }  from './stores/stores.component';
import { NavComponent }  from './nav/nav.component';
import { ProductComponent }  from './product/product.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ProfileComponent} from './profile/profile.component';


const app_routes: Routes = [
  { path: '',  component: StoresComponent },
  { path: 'product/brands/:id',  component: ProductComponent },
  { path: 'checkout/shipping', component: ShippingComponent},
  { path: 'account/profile', component: ProfileComponent}
];

export const app_routing = RouterModule.forRoot(app_routes); 