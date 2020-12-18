import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SignUpRes } from "./auth.model";

import { environment } from "../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
const BACKEND_URL = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListner = new Subject<boolean>();
  private tokenTimer: any;
  username: string;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  //******************getting username
  getUserName() {
    return this.username;
  }

  //************************listing signup request */

  createUser(username: string, email: string, password: string) {
    const data = { username: username, email: email, password: password };
    this.http
      .post<{ message: string; user: SignUpRes }>(`${BACKEND_URL}/signUp`, data)
      .subscribe(
        (data) => {
          this.router.navigate(["/login"]);
          this.flashMessages.show("account created please login to proceed", {
            cssClass: "alert-success",
            timeout: 4000,
          });
        },
        (err) => {
          this.flashMessages.show(" oop's something went wromg!", {
            cssClass: "alert-danger",
            timeout: 4000,
          });
        }
      );
  }

  //***************************login in user */

  signIn(email: string, password: string) {
    const data = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; username: string }>(
        `${BACKEND_URL}/signIn`,
        data
      )
      .subscribe(
        (result) => {
          const token = result.token;
          this.token = token;
          if (token) {
            const expiresInDuration = result.expiresIn;
            this.setAuthTimer(expiresInDuration);

            this.isAuthenticated = true;
            this.username = result.username;

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.username);
            this.authStatusListner.next(true);
            this.flashMessages.show("you  have logged In successfully", {
              cssClass: "alert-success",
              timeout: 4000,
            });
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.authStatusListner.next(false);
          this.flashMessages.show(
            "please provide a correct username and password!",
            {
              cssClass: "alert-danger",
              timeout: 4000,
            }
          );
        }
      );
  }

  //***********logout handler */
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.username = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  //****************************setting auto logout handler */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //****************saveing the auth data  */
  private saveAuthData(token: string, expirationDate: Date, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("username", username);
  }

  //*******************clearing the local storage after logout
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("username");
  }

  //**************************automating the logout or setting token on particular time
  autoAuthUser() {
    const autoUserAuth = this.getAuthData();
    if (!autoUserAuth) {
      return;
    }
    const now = new Date();
    const expiresIn = autoUserAuth.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = autoUserAuth.token;
      this.isAuthenticated = true;
      this.username = autoUserAuth.username;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  //****************get the auth data from the localstorage
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const username = localStorage.getItem("username");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username,
    };
  }
}
