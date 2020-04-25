import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent } from './add-product/add-product.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShopperHomeComponent } from './shopper-home/shopper-home.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: "admin/addProduct", component: AddProductComponent },
  { path: "admin/home", component: AdminHomeComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "shopper/product", component: ProductComponent },
  { path: "shopper/home", component: ShopperHomeComponent },
  { path: "", component: ShopperHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
