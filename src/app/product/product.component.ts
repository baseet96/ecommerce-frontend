import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductApiService } from "../shared/product-api/product-api.service";
import { UserInfoService } from "../shared/user-info/user-info.service";
import { Subscription } from "rxjs";
import { Product } from "../shared/product.model";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  userSubscription: Subscription;
  dataSubscription: Subscription;
  product: Product;
  userData: any;
  constructor(
    private router: Router,
    private productApiService: ProductApiService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.dataSubscription = this.productApiService.apiData$.subscribe(
      (product) => {
        this.product = product;
      }
    );
    this.userSubscription = this.userInfoService.userData$.subscribe(
      (userData) => {
        this.userData = userData;
      }
    );
  }

  addToCart() {
    let user = { ...this.userData.user };
    if (!this.userData.cartId) {
      this.productApiService
        .createNewCart({ user }, this.product.id)
        .subscribe((result) => {
          this.userInfoService.setData({ ...this.userData, cartId: result.id });
        });
    } else {
      this.productApiService
        .addToCart(this.userData.cartId, this.product.id, 1)
        .subscribe((result) => {
          this.router.navigateByUrl('/shopper/cart');
        });
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
