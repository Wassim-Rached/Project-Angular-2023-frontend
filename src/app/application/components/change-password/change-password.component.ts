import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  profileId!: string;
  Form!: FormGroup;
  // loading states
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // get the profile id
    this.profileId = this.authService.getAccountId()!;

    // initialize the form
    this.Form = this.fb.nonNullable.group(
      {
        old_password: ['', Validators.required],
        new_password: ['', Validators.required],
        confirm_new_password: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    // set submitting to true
    this.isSubmitting = true;

    // get the old and new password
    const { old_password, new_password } = this.Form.value;

    // call the change password service
    this.accountService
      .changePassword(this.profileId, old_password, new_password)
      .subscribe({
        next: (res) => {
          // set submitting to false
          this.isSubmitting = false;

          // show success message
          alert('Password changed successfully');
          // reset the form
          this.Form.reset();
        },
        error: (error) => {
          // set submitting to false
          this.isSubmitting = false;

          // if the error is 400
          // set the form errors
          if (error.status === 400) this.handleFormErrors(error.error);
        },
      });
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

  // from stackoverflow
  // for password match validation
  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const newPassword = control.get('new_password');
    const confirmPwd = control.get('confirm_new_password');

    if (!newPassword || !confirmPwd) {
      return null;
    }

    return newPassword.value === confirmPwd.value
      ? null
      : { passwordMismatch: true };
  }

  // check if the field has certain error
  public fieldHasError(field: string, error: string): boolean {
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

  // get the server error message
  public getFieldServerErrorMessage(field: string): string {
    return this.Form.get(field)?.errors?.['serverError'];
  }
}
