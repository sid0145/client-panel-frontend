import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../client";
import { ClientService } from "../client.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    balance: 0,
  };

  disabledBalanceOnAdd: boolean = true;

  constructor(
    private flashMessages: FlashMessagesService,
    private clientService: ClientService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (this.disabledBalanceOnAdd) {
      form.value.balance = 0;
    }
    if (form.invalid) {
      this.flashMessages.show("Please fill the form correctly!", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
      return;
    }

    this.clientService.newClient(
      form.value.firstname,
      form.value.lastname,
      form.value.email,
      form.value.phone,
      form.value.balance
    );
  }
}
