import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { UserInfoService } from "./shared/user-info/user-info.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ecommerce-frontend";

  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
    this.app.authenticate(undefined, undefined);
  }

  ngOnInit() {
    // dummy data
    this.userInfoService.setData({
      user: {
        name: "jim",
        email: "jim@gmail.com",
        password: "password",
        kind: "CUSTOMER",
        dob: "1991-01-12T06:45:76",
      },
      hasCart: true,
    });
  }

  logout() {
    this.http
      .post("logout", {})
      .pipe(
        finalize(() => {
          this.app.authenticated = false;
          this.router.navigateByUrl("/login");
        })
      )
      .subscribe();
  }
}
