import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JoinUs, Status } from 'src/app/application/classes/join-us';
import { AccountService } from 'src/app/application/services/account.service';

@Component({
  selector: 'app-joining-list-admin',
  templateUrl: './joining-list-admin.component.html',
  styleUrls: ['./joining-list-admin.component.css'],
})
export class JoiningListAdminComponent implements OnInit {
  joiningForms: JoinUs[] = [];
  Form!: FormGroup;
  // loading states
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // set the loading state to true

    // init the form
    this.Form = this.fb.group({
      status: ['pending'],
      ordering: ['-created_at'],
    });

    // query the joining forms
    this.onSubmit();
  }

  onSubmit() {
    if (this.isSubmitting) return;

    const { status, ordering } = this.Form.value;

    // set the loading submit state to true
    this.isSubmitting = true;

    // set the params
    const params = new HttpParams()
      .set('status', status)
      .set('ordering', ordering);

    // query the joining forms
    this.accountService.getAllJoiningForms(params).subscribe({
      next: (joiningForms) => {
        // set the joining forms
        this.joiningForms = joiningForms;
        // set the loading submit state to false
        this.isSubmitting = false;
      },
      error: (error) => {
        // set the loading submit state to false
        this.isSubmitting = false;
      },
    });
  }

  public Accept(id: string) {
    this.accountService.acceptJoiningForm(id).subscribe({
      next: (status) => {
        // update the status of the joining form
        const index = this.joiningForms.findIndex((x) => x.id === id);
        this.joiningForms[index].status = 'accepted';
      },
    });
  }

  public Reject(id: string) {
    this.accountService.rejectJoiningForm(id).subscribe({
      next: (status) => {
        // update the status of the joining form
        const index = this.joiningForms.findIndex((x) => x.id === id);
        this.joiningForms[index].status = 'rejected';
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
