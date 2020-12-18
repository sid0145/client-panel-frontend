import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Client } from "./client";

const BACKEND_URL = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class ClientService {
  clients: Client[] = [];

  private clientUpdatedListner = new Subject<{ clients: Client[] }>();

  constructor(
    private http: HttpClient,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  //***************updating all the sibilings component */
  getUpdatedClientListner() {
    return this.clientUpdatedListner.asObservable();
  }
  //********************getting all the clients */
  getClients() {
    this.http
      .get<{ message: string; clients: Client[] }>(`${BACKEND_URL}/clients`)
      .subscribe((data) => {
        this.clients = data.clients;
        this.clientUpdatedListner.next({ clients: [...this.clients] });
      });
  }

  //*********************adding a new client */
  newClient(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    balance: number
  ) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      balance: balance,
    };
    this.http.post(`${BACKEND_URL}/newClient`, data).subscribe((data) => {
      this.router.navigate(["/"]);
      this.flashMessages.show("Client added succesfully", {
        cssClass: "alert-success",
        timeout: 4000,
      });
    });
  }

  //**********************get a single client by it's id */
  getClient(id: string) {
    return this.http.get(`${BACKEND_URL}/client/${id}`);
  }

  //***************update the balance by client id */
  updateBalanceWithId(client: Client) {
    this.http
      .put(`${BACKEND_URL}/client/${client._id}`, client)
      .subscribe((clientData) => {});
  }

  //***************************delete handler  */

  onDelete(id: string) {
    this.http.delete(`${BACKEND_URL}/client/${id}`).subscribe((data) => {
      this.router.navigate(["/"]);
      this.flashMessages.show("client deleted successfully!", {
        cssClass: "alert-success",
        timeout: 4000,
      });
    });
  }
}
