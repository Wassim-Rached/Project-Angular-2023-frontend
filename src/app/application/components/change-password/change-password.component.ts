import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  Form!: FormGroup;
  @Input() profileId!: string;
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.nonNullable.group({
      old_password: [''],
      new_password: [''],
    });
  }
  onSubmit() {
    this.isSubmitting = true;
    const { old_password, new_password } = this.Form.value;
    this.accountService
      .changePassword(this.profileId, old_password, new_password)
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          alert('password changed !');
        },
        error: (error) => {
          this.isSubmitting = false;
          if (error.status === 400) this.handleFormErrors(error.error);
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

  public fieldHasError(field: string): boolean {
    return this.Form.get(field)?.hasError('serverError') ?? true;
  }

  public getFieldErrorMessage(field: string): string {
    return this.Form.get(field)?.errors?.['serverError'];
  }
}
