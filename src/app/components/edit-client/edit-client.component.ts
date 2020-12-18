import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from "../client";
import { ClientService } from "../client.service";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    balance: 0,
  };
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.clientService
      .getClient(this.id)
      .subscribe((client: { client: Client }) => {
        this.client = client.client;
      });
  }

  //************updating client */
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.flashMessages.show("please fill the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
      return;
    }
    form.value._id = this.id;
    this.clientService.updateBalanceWithId(form.value);
    this.router.navigate(["/client/" + this.id]);
    this.flashMessages.show("Client updated succesfully", {
      cssClass: "alert-success",
      timeout: 4000,
    });
  }
}
