import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SignUpRes } from "./auth.model";

import { environment } from "../../environments/environment";
const BACKEND_URL = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //************************listing signup request */

  createUser(username: string, email: string, password: string) {
    const data = { username: username, email: email, password: password };
    return this.http.post<{ message: string; user: SignUpRes }>(
      `${BACKEND_URL}/signUp`,
      data
    );
  }
}
