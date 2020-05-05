import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShopperHeaderComponent } from './shopper-header/shopper-header.component';
import { ShopperHomeComponent } from './shopper-home/shopper-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductApiService } from './shared/product-api/product-api.service'
import { AuthApiService } from './shared/auth-api/auth-api.service'
import { UserInfoService } from './shared/user-info/user-info.service';
import { AppService } from './app.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    LoginComponent,
    ProductComponent,
    RegistrationComponent,
    ShopperHeaderComponent,
    ShopperHomeComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, ProductApiService, AuthApiService, UserInfoService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

