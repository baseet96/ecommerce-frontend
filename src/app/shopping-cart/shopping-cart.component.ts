import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../shared/product-api/product-api.service';
import { UserInfoService } from "../shared/user-info/user-info.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  userSubscription: Subscription;
  userData: any;
  products: any;

  constructor(
    private productApiService: ProductApiService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userInfoService.userData$.subscribe(
      (userData) => {
        this.userData = userData;
      }
    );
  }

  ngOnDestroy() {
    this.userData.unsubscribe();
  }

  getCart(): void {
    this.productApiService.getAllProducts().subscribe(
      (data: any) => {
        console.log(data);
        this.products = data;
      },
      (error) => console.error(error)
    );
  }

  removeProduct(): void {}
}
