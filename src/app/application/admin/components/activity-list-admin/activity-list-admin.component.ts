import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from 'src/app/application/classes/activity';
import { ActivityService } from 'src/app/application/services/activity.service';

@Component({
  selector: 'app-activity-list-admin',
  templateUrl: './activity-list-admin.component.html',
  styleUrls: ['./activity-list-admin.component.css'],
})
export class ActivityListAdminComponent implements OnInit {
  activities: Activity[] = [];
  Form!: FormGroup;
  isSubmitting = false;

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // initialize the form
    this.Form = this.fb.nonNullable.group({
      title__icontains: [''],
      ordering: ['created_at'],
    });

    // query the activities
    this.queryActivities();
  }

  onSubmit() {
    const { title__icontains, ordering } = this.Form.value;
    this.queryActivities(ordering, title__icontains);
  }

  onDelete(id: string) {
    const isUserSure = window.confirm(
      'are you sure about deleting this activity ?'
    );
    if (!isUserSure) return;
    this.activityService.deleteActivityById(id!).subscribe({
      next: (res) => {
        this.activities = this.activities.filter(
          (activity) => activity.id != id
        );
      },
    });
  }

  queryActivities(
    ordering: string = 'created_at',
    title__icontains: string = ''
  ) {
    // set the loading submit state to true
    this.isSubmitting = true;

    // set the params
    const params = new HttpParams()
      .set('title__icontains', title__icontains)
      .set('ordering', ordering);

    // get the activities
    this.activityService.getAllActivities(params).subscribe({
      next: (activities) => {
        // set the activities
        this.activities = activities;
        // set the loading submit state to false
        this.isSubmitting = false;
      },
      error: (error) => {
        // set the loading submit state to false
        this.isSubmitting = false;
      },
    });
  }
}
