import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinUs, Status } from 'src/app/application/classes/join-us';
import { AccountService } from 'src/app/application/services/account.service';

@Component({
  selector: 'app-join-us-details-admin',
  templateUrl: './join-us-details-admin.component.html',
  styleUrls: ['./join-us-details-admin.component.css'],
})
export class JoinUsDetailsAdminComponent implements OnInit {
  joinForm?: JoinUs;
  joinId?: string;
  // loading states
  isPageLoading: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // set loading state to true
    this.isPageLoading = true;

    // get activity id from route
    this.joinId = this.activatedRoute.snapshot.params['joinUsId'];

    // get the joinUs form by id
    this.accountService.getJoiningFormById(this.joinId!).subscribe({
      next: (joinForm) => {
        this.joinForm = joinForm;
        // set loading state to false
        this.isPageLoading = false;
      },
      error: (error) => {
        // set loading state to false
        this.isPageLoading = false;
      },
    });
  }

  Accept() {
    // set loading state to true
    this.isSubmitting = true;

    // accept the join us form
    this.accountService.acceptJoiningForm(this.joinId!).subscribe({
      next: (status) => {
        // update the status
        this.joinForm!.status = status;
        // set loading state to false
        this.isSubmitting = false;
      },
      error: (error) => {
        // set loading state to false
        this.isSubmitting = false;
      },
    });
  }

  Reject() {
    // set loading state to true
    this.isSubmitting = true;

    // reject the join us form
    this.accountService.rejectJoiningForm(this.joinId!).subscribe({
      next: (status) => {
        // update the status
        this.joinForm!.status = status;
        // set loading state to false
        this.isSubmitting = false;
      },
      error: (error) => {
        // set loading state to false
        this.isSubmitting = false;
      },
    });
  }

  public isAccepted(status: Status) {
    return status === 'accepted';
  }

  public isPending(status: Status) {
    return status === 'pending';
  }

  public isRejected(status: Status) {
    return status === 'rejected';
  }
}
