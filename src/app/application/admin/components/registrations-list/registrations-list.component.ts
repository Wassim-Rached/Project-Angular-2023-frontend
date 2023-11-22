import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from 'src/app/application/classes/activity';
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
  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
        if (activities.length > 0) {
          this.Form.patchValue({ activityId: activities[0].id });
          this.onSubmit();
        }
      },
    });
    this.Form = this.fb.nonNullable.group({
      activityId: [''],
    });
  }

  onSubmit() {
    const { activityId } = this.Form.value;

    this.activityService.getActivityRegistrations(activityId).subscribe({
      next: (registrations) => {
        console.log(registrations);
        this.registrations = registrations;
      },
    });
  }
  onAccept(id: string) {
    this.activityService.acceptRegistration(id).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
  onPay(id: string) {
    this.activityService.payRegistration(id).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
