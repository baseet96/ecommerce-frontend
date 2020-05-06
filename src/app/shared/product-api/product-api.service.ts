import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { NewProduct, Product } from "../product.model";
import { apiAddr } from '../../config';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: "root",
})
export class ProductApiService {
  API_URL = apiAddr + "products/";
  API_CART_URL = apiAddr + "cart/";

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  public allProducts;

  constructor(private app: AppService, private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.API_URL + 'all');
      
  }

  addNewProduct(newProduct: NewProduct): Observable<any> {
    return this.http.post<Product>(this.API_URL + "add-product", newProduct);
  }

  getCart(id: any): Observable<any> {
    return this.http.get<any>(this.API_CART_URL, { params: { id } });
  }

  createNewCart(cart: any, productId: any): Observable<any> {
    return this.http.post<any>(this.API_CART_URL + "create", cart, {
      params: { productId: productId },
    });
  }

  addToCart(cartId: any, productId: any, quantity: any): Observable<any> {
    return this.http.put<any>(this.API_CART_URL + "product", null, {
      params: { cartId, productId, quantity },
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  // Broadcast api data
  setData(data) {
    this.apiData.next(data);
  }
}
