import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { JoinUs } from '../../classes/join-us';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageText } from '../../types';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit {
  Form!: FormGroup;
  join?: JoinUs;
  message?: MessageText;
  isAuthenticated: boolean = false;
  // loading states
  isPageLoading = false;
  isSubmitting = false;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Set page loading
    this.isPageLoading = true;

    // Check if user is authenticated
    this.isAuthenticated = this.authService.isAuthenticated();

    // Create form
    this.Form = this.fb.nonNullable.group({
      how_found_us: ['', Validators.required],
      goals: ['', Validators.required],
      reasons: ['', Validators.required],
      receive_emails: [true],
    });

    // Get join us form
    this.accountService.getAllJoiningForms().subscribe({
      next: (data) => {
        // the non admin will only get his own form
        // the admin will get all forms
        // either way the data will be an array of one element
        // and the first element will be the user's form
        this.join = data[0];
        this.isPageLoading = false;
      },
      error: () => {
        this.isPageLoading = false;
      },
    });
  }

  public onSubmit() {
    // Set button loading to true
    this.isSubmitting = true;

    // send the request
    this.accountService.joinClub(this.Form.value).subscribe({
      next: (data) => {
        // Set message text
        this.message = {
          status: 'success',
          text: 'Your request has been sent successfully',
        };
        // Set button loading to false
        this.isSubmitting = false;

        // Set join us form after 3 seconds
        setTimeout(() => {
          this.join = data;
        }, 3000);
      },
      error: (error) => {
        // Set message text
        this.message = {
          status: 'error',
          text: 'Something went wrong, please try again later',
        };
        // Set button loading to false
        this.isSubmitting = false;
      },
    });
  }

  public isAccepted() {
    return this.join?.status === 'accepted';
  }

  public isPending() {
    return this.join?.status === 'pending';
  }

  public isRejected() {
    return this.join?.status === 'rejected';
  }

  // check if the field has required error
  public haveRequiredError(field: string) {
    return (
      this.Form.get(field)?.errors?.['required'] &&
      this.Form.get(field)?.touched
    );
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

  // get the server error message
  public getFieldServerErrorMessage(field: string): string {
    return this.Form.get(field)?.errors?.['serverError'];
  }
}
