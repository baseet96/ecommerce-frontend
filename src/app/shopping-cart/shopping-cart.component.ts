import { Component, OnInit } from "@angular/core";
import { ProductApiService } from "../shared/product-api/product-api.service";
import { UserInfoService } from "../shared/user-info/user-info.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userData: any;
  cart: any;

  constructor(
    private productApiService: ProductApiService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userInfoService.userData$.subscribe(
      (userData) => {
        this.userData = userData;
        this.cartSubscription = this.productApiService
          .getCart(userData.cartId)
          .subscribe(
            (cart) => {
              this.cart = cart;
            },
            (error) => console.error(error)
          );
      }
    );
  }

  ngOnDestroy() {
    this.userData.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  removeProduct(productId: any, quantity: any): void {
    this.productApiService
      .addToCart(this.userData.cartId, productId, quantity)
      .subscribe((cart) => {
        console.log(cart);
        this.cart = cart;
      });
  }
}
