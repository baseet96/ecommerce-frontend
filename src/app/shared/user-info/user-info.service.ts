import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { apiAddr } from '../../config';

@Injectable({
  providedIn: "root",
})
export class UserInfoService {
  private userData = new BehaviorSubject<any>(null);
  public userData$ = this.userData.asObservable();
  constructor() {}
  setData(data) {
    this.userData.next(data);
  }
}
