import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {

        if (res.succeeded) {

          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');

        } else {
          res.errors.forEach(error => {

            switch (error.code) {

              case 'DuplicateUserName':
                this.toastr.error('Username is already taken!', 'Registration failed.');
                break;

              default:
                this.toastr.error(error.description, 'Registration failed.');
                break;
            }

          });
        }

      },
      err => {
        console.log(err);
      }
    );
  }
}
