import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Setting } from "./setting";

@Injectable({
  providedIn: "root",
})
export class SettingService {
  settings: Setting = {
    allowRegistration: true,
    disabaleBalanceOnAdd: true,
    disableBalanceOnEdit: true,
  };

  getRegistrationUpdateListner = new Subject<boolean>();

  constructor() {
    if (localStorage.getItem("settings") != null) {
      this.settings = JSON.parse(localStorage.getItem("settings"));
    }
  }

  getRegistration() {
    return this.getRegistrationUpdateListner.asObservable();
  }

  getSettings(): Setting {
    return this.settings;
  }

  changeSettings(settings: Setting) {
    localStorage.setItem("settings", JSON.stringify(settings));
    this.getRegistrationUpdateListner.next(this.settings.allowRegistration);
  }
}
