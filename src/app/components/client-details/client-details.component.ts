import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "../client";
import { ClientService } from "../client.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.id = this.route.snapshot.params["id"];
    this.clientService
      .getClient(this.id)
      .subscribe((client: { client: Client }) => {
        this.isLoading = false;
        if (client != null) {
          if (client.client.balance > 0) {
            this.hasBalance = true;
          }
        }
        this.client = client.client;
      });
  }

  //*******************update balance handler */
  updateBalance() {
    this.clientService.updateBalanceWithId(this.client);
    this.router.navigate(["/client/" + this.id]);
    this.flashMessages.show("Client balance updated succesfully", {
      cssClass: "alert-success",
      timeout: 4000,
    });
    this.showBalanceUpdateInput = false;
  }

  //*******************delete handler */
  onDelete() {
    this.clientService.onDelete(this.id);
  }
}
