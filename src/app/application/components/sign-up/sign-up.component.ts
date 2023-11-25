import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['M', Validators.required],
      phone_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  onSubmit() {
    // disable the submit button
    this.isSubmitting = true;

    // get the form data
    const data = this.Form.value;

    // create the account object
    const account = { user: data } as Account;

    // create the account
    this.accountService.createAccount(account).subscribe({
      next: (response) => {
        // sign in the user
        this.authService.signin(data.username, data.password).subscribe({
          next: (token) => {
            // authentificate the user
            this.authService.authentificate(token);
            this.authService.redirectAfterSignin();
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
          this.handleFormErrors(error.error.user);
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

  // check if the field has certain error
  public fieldHasError(field: string, error: string = 'serverError'): boolean {
    const formFiled = this.Form.get(field);
    if (!formFiled) return false;

    return formFiled.hasError(error);
  }

  // check if the field has any error
  public fieldHasAnyError(field: string): boolean {
    const formFiled = this.Form.get(field);
    if (!formFiled) return false;

    return formFiled.invalid && (formFiled.touched || formFiled.dirty);
  }

  // check if the field has required error
  public haveRequiredError(field: string) {
    return (
      this.Form.get(field)?.errors?.['required'] &&
      this.Form.get(field)?.touched
    );
  }

  // get the server error message
  public getFieldServerErrorMessage(field: string): string {
    return this.Form.get(field)?.errors?.['serverError'];
  }

  // set the errors from the backend
  // on the form controls
  private handleFormErrors(errors: any): void {
    for (const field in errors) {
      if (this.Form.get(field)) {
        this.Form.get(field)?.setErrors({ serverError: errors[field][0] });
      }
    }
  }
}
