import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ProductApiService } from "../shared/product-api/product-api.service";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { ProductService } from "../shared/product/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm = this.formBuilder.group({
    name: "",
    description: "",
    price: "",
    discount: "",
    deliveryCharge: "",
    inventory: "",
  });
  subscription: Subscription;
  product: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productApiService: ProductApiService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscription = this.productService.product$.subscribe((product) => {
      this.route.url.subscribe((url) => {
        if (url[1].path.startsWith("e")) {
          this.productForm.setValue({
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            deliveryCharge: product.deliveryCharges,
            inventory: product.quantityInInventory,
          });
        }
      });
    },(error) => console.error(error));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    this.productApiService
      .addNewProduct({ ...this.productForm.value })
      .subscribe(() => {
        this.router.navigateByUrl("/admin/home");
      });
  }
}
