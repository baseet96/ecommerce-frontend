import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NewProduct, Product } from "../product.model";
import { apiAddr } from '../../config';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  constructor(private app: AppService, private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(apiAddr + "register-user", user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(apiAddr + "login-user", user);
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
