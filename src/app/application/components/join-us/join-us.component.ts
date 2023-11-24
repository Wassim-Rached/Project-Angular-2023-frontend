import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { JoinUs } from '../../classes/join-us';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css'],
})
export class JoinUsComponent implements OnInit {
  Form!: FormGroup;
  join?: JoinUs;
  isAuthenticated: boolean = false;
  isPageLoading = false;

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
        this.join = data[0];
        this.isPageLoading = false;
      },
      error: () => {
        this.isPageLoading = false;
      },
    });
  }

  public haveRequiredError(field: string) {
    return (
      this.Form.get(field)?.errors?.['required'] &&
      this.Form.get(field)?.touched
    );
  }

  public JoinClub() {
    this.accountService.joinClub(this.Form.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Successfully joined club');
      },
      error: () => alert('Failed to join club'),
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
}
