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

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit(form: FormGroup): void {
    const username = form.value.username;
    const password = form.value.password;
    this.authService.signin(username, password).subscribe({
      next: (token) => {
        this.authService.authentificate(token);
        this.authService.redirectAfterSignin();
      },
      error: (error) => {
        if (error.status === 400) {
          this.handleFormErrors(error.error);
        } else if (error.status === 401) {
          this.errorDescription = 'Invalid credentials';
        } else {
          console.error('Unexpected error:', error);
        }
      },
    });
  }

  private handleFormErrors(errors: any): void {
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
