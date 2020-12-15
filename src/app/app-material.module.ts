import { NgModule } from "@angular/core";

import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
} from "@angular/material";

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule],
  exports: [MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule],
})
export class AppMaterialModule {}
