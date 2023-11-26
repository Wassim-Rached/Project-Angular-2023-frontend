import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageText } from '../../types';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  Form!: FormGroup;
  message?: MessageText;
  // loading states
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    // disable the submit button
    this.isSubmitting = true;
    const { username, password } = this.Form.value;

    this.authService.signin(username, password).subscribe({
      next: (token) => {
        // authentificate the user
        this.authService.authentificate(token);

        // load the current account
        this.accountService.getMyAccount().subscribe({
          next: (account) => {
            // set the user role
            this.authService.setRole(account.role);
            // set the user account id
            this.authService.setAccountId(account.id!);
            // redirect the user
            this.authService.redirectAfterSignin();
            // enable the submit button
            this.isSubmitting = false;
          },
          error: (error) => {
            // enable the submit button
            this.isSubmitting = false;

            // remove the token (might be expired or invalid)
            this.authService.unauthentificate();

            // handle the errors
            this.message = {
              text: "Account couldn't be loaded, please try again later",
              status: 'error',
            };
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
        } else if (error.status === 401) {
          // for unauthorized errors
          this.message = {
            text: 'Username or password is incorrect',
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
}
