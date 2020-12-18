import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Setting } from "../setting";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  settings: Setting;

  constructor(
    private router: Router,
    private settingService: SettingService,
    private flashmessages: FlashMessagesService
  ) {}

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }
  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.router.navigate(["/"]);
    this.flashmessages.show("setting saved", {
      cssClass: "alert-success",
      timeout: 4000,
    });
  }
}
