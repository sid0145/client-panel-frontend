import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppMaterialModule } from "./app-material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { LoginComponent } from "./auth/login/login.component";
import { ResisterComponent } from "./auth/resister/resister.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    NavbarComponent,
    SidebarComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,
    LoginComponent,
    ResisterComponent,
    SettingsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
