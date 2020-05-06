import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiAddr } from './config'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
      const headers = new HttpHeaders(credentials ? {
          authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.password)
      } : {});

      this.http.get(apiAddr + 'auth/user', {headers: headers}).subscribe(response => {
          if (response['name']) {
              this.authenticated = true;
          } else {
              this.authenticated = false;
          }
          return callback && callback();
      });
    }
}