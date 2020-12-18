import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SettingService } from "./setting.service";

@Injectable()
export class SettingGuard implements CanActivate {
  constructor(private settingService: SettingService, private router: Router) {}
  canActivate(): boolean {
    if (this.settingService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
