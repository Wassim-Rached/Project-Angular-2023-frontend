import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  errorDescription?: string;
  loginForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit(form: FormGroup): void {
    // disable the submit button
    this.isSubmitting = true;
    const { username, password } = form.value;

    this.authService.signin(username, password).subscribe({
      next: (token) => {
        // authentificate the user
        this.authService.authentificate(token);
        // then redirect him
        this.authService.redirectAfterSignin();
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
      if (this.loginForm.get(field)) {
        this.loginForm.get(field)?.setErrors({ serverError: errors[field][0] });
      }
    }
  }

  public fieldHasError(field: string): boolean {
    return this.loginForm.get(field)?.hasError('serverError') ?? true;
  }

  public getFieldErrorMessage(field: string): string {
    return this.loginForm.get(field)?.errors?.['serverError'];
  }
}
