import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../classes/account';
import { MessageText } from '../../types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  Form!: FormGroup;
  message?: MessageText;
  //
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      gender: ['M'],
      phone_number: [''],
      first_name: [''],
      last_name: [''],
      photo: [null],
    });
  }

  onSubmit() {
    // disable the submit button
    this.isSubmitting = true;

    // get the form data
    const data = this.Form.value;

    // create the formData for the photo
    const formData = new FormData();
    formData.append('photo', data.photo);
    delete data.photo;

    // create the account object
    const account = { user: data };

    // create the account
    this.accountService.createAccount(account).subscribe({
      next: (response) => {
        // sign in the user
        const accountId = response.id;
        this.authService.signin(data.username, data.password).subscribe({
          next: (response) => {
            // authentificate the user
            this.authService.authentificate(response);
            // update the photo
            this.accountService
              .updateAccount(accountId!, formData as Account)
              .subscribe({
                next: (response) => {
                  this.isSubmitting = false;
                  this.Form.reset();
                  this.message = {
                    text: 'Your account has been created',
                    status: 'success',
                  };
                  // this.authService.redirectAfterSignin();
                },
                error: (error) => {
                  // error with the photo update
                  this.isSubmitting = false;
                  console.error(error);
                  this.message = {
                    text: 'Your account has been created but the photo has not been updated',
                    status: 'warning',
                  };
                },
              });
          },
          error(error) {
            // error with the authentification
            console.error(error);
          },
        });
      },
      error: (error) => {
        // enable the submit button
        this.isSubmitting = false;

        // handle the errors
        if (error.status === 400) {
          // for validation errors
          this.handleFormErrors(error.error);
          this.message = {
            text: 'Please correct the errors',
            status: 'error',
          };
        } else if (error.status === 401) {
          // for unauthorized errors
          this.message = {
            text: error.error.message,
            status: 'error',
          };
        } else {
          // for unexpected errors
          this.message = {
            text: 'Something went wrong, please try again later',
            status: 'error',
          };
        }
      },
    });
  }

  private handleFormErrors(errors: any): void {
    // set the errors from the backend
    // on the form controls
    for (const field in errors) {
      if (this.Form.get(field)) {
        this.Form.get(field)?.setErrors({ serverError: errors[field][0] });
      }
    }
  }

  getFieldErrorMessage(field: string): string {
    return '';
  }

  fieldHasError(field: string): boolean {
    return false;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Form.get('photo')?.setValue(file);
    }
  }
}
