import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductApiService } from "../shared/product-api/product-api.service";
import { ProductService } from "../shared/product/product.service";

@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.component.html",
  styleUrls: ["./admin-home.component.css"],
})
export class AdminHomeComponent implements OnInit {
  products: any;

  constructor(
    private productApiService: ProductApiService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  editProduct(product: any): void {
    this.productService.setProduct(product);
    this.router.navigateByUrl("/admin/edit-product");
  }

  deleteProduct(id: any): void {
    this.productApiService.deleteProduct(id).subscribe(
      (response) => {
        console.log(response);
        this.getProducts();
      },
      (error) => console.error(error)
    );
  }

  getProducts(): void {
    this.productApiService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => console.error(error)
    );
  }
}
