import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from 'src/app/application/classes/activity';
import { Status } from 'src/app/application/classes/join-us';
import { Registration } from 'src/app/application/classes/registration';
import { ActivityService } from 'src/app/application/services/activity.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css'],
})
export class RegistrationsListComponent implements OnInit {
  Form!: FormGroup;
  registrations: Registration[] = [];
  activities: Activity[] = [];
  activityId?: string;
  // loading states
  isPageLoading = false;

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
        if (activities.length > 0) {
          this.Form.patchValue({ activityId: activities[0].id });
          this.onSubmit();
        }
      },
    });

    // Init form
    this.Form = this.fb.nonNullable.group({
      activityId: [''],
    });
  }

  onSubmit() {
    const { activityId } = this.Form.value;
    this.activityService.getActivityRegistrations(activityId).subscribe({
      next: (registrations) => {
        this.registrations = registrations;
        this.activityId = activityId;
      },
    });
  }

  public onAccept(id: string) {
    this.activityService.acceptRegistration(id).subscribe({
      next: (data) => {
        // update the registration
        const index = this.registrations.findIndex((r) => r.id === id);
        this.registrations[index].status = 'accepted';
      },
    });
  }

  public onReject(id: string) {
    this.activityService.rejectRegistration(id).subscribe({
      next: (data) => {
        // update the registration
        const index = this.registrations.findIndex((r) => r.id === id);
        this.registrations[index].status = 'rejected';
      },
    });
  }

  public onPay(id: string) {
    this.activityService.payRegistration(id).subscribe({
      next: (data) => {
        // update the registration
        const index = this.registrations.findIndex((r) => r.id === id);
        this.registrations[index].is_payed = true;
      },
    });
  }

  public onUnpay(id: string) {
    this.activityService.unpayRegistration(id).subscribe({
      next: (data) => {
        // update the registration
        const index = this.registrations.findIndex((r) => r.id === id);
        this.registrations[index].is_payed = false;
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

  public currentActivityIsFree() {
    const activity = this.activities.find((a) => a.id === this.activityId);
    return activity?.is_free;
  }
}
