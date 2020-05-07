import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productSource = new BehaviorSubject<any>(null);
  product$ = this.productSource.asObservable();
  setProduct(product: any) {
    this.productSource.next(product);
  }
}
