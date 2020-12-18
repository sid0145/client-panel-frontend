import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  //**************initiliazing the form */
  private initForm() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  //***********submitting the form */

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.signIn(
      this.signInForm.value.email,
      this.signInForm.value.password
    );
  }
}
