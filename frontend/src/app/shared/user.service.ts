import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  readonly BaseURI = 'http://localhost:51831/api';

  formModel = this.formBuilder.group({
    UserName: ['', Validators.required],
    FullName: [''],
    Email: ['', Validators.email],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validators: this.comparePasswords })
  });

  private comparePasswords(formBuilder: FormGroup) {
    let confirmPasswordControl = formBuilder.get('ConfirmPassword');

    if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
      if (formBuilder.get('Password').value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true })
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };

    return this.httpClient.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
}
