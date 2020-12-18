import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private userAuthSub: Subscription;
  username: string;
  showRegister: boolean;
  registerListnerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private setttingService: SettingService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.username = this.authService.getUserName();
    this.userAuthSub = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.username = this.authService.getUserName();
      });
    this.showRegister = this.setttingService.getSettings().allowRegistration;
    this.registerListnerSubs = this.setttingService
      .getRegistration()
      .subscribe((value) => {
        this.showRegister = value;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userAuthSub.unsubscribe();
    this.registerListnerSubs.unsubscribe();
  }
}
