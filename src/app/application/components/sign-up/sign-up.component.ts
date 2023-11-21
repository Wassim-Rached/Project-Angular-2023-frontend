import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../classes/account';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  Form!: FormGroup;
  errorDescription: string = '';
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
    const data = this.Form.value;
    const formData = new FormData();

    formData.append('photo', data.photo);
    // data.photo = null;

    console.log(formData);

    const account = { user: data };

    this.isSubmitting = true;
    this.errorDescription = '';

    // create the account
    this.accountService.createAccount(account).subscribe({
      next: (response) => {
        // sign in the user
        const id = response.id;
        this.authService.signin(data.username, data.password).subscribe({
          next: (response) => {
            // authentificate the user
            this.authService.authentificate(response);
            this.authService.redirectAfterSignin();
            // update the photo
            // this.accountService
            //   .updateAccount(id!, formData as Account)
            //   .subscribe({
            //     next: (response) => {
            //       this.isSubmitting = false;
            //       this.Form.reset();

            //     },
            //   });
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
          this.errorDescription = '';
        } else if (error.status === 401) {
          // for unauthorized errors
          this.errorDescription = 'Invalid credentials';
        } else {
          // for unexpected errors
          this.errorDescription = 'Unexpected error';
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
      this.Form?.get('photo')?.setValue(file);
    }
  }
}
