import { Component, OnInit } from "@angular/core";
import { Client } from "../client";
import { ClientService } from "../client.service";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  totalBalance: number;
  isLoading = false;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.isLoading = true;
    this.clientService.getClients();
    this.clientService.getUpdatedClientListner().subscribe((clients) => {
      this.isLoading = false;
      this.clients = clients.clients;
      this.getTotalBalance();
    });
  }

  //**************get Total balance */

  getTotalBalance() {
    this.totalBalance = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }
}
