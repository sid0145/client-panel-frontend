import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-resister",
  templateUrl: "./resister.component.html",
  styleUrls: ["./resister.component.css"],
})
export class ResisterComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.initForm();
  }

  //**************initiliazing the form */
  private initForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("[A-Za-z].*")],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.authService.createUser(
      this.signUpForm.value.username,
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );
  }
}
