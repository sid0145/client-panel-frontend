import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { ResisterComponent } from "./auth/resister/resister.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: ResisterComponent },
  {
    path: "client/add",
    component: AddClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "client/edit/:id",
    component: EditClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "client/:id",
    component: ClientDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
