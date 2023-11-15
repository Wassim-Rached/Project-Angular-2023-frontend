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

  onSubmit() {
    const { title__icontains, ordering } = this.Form.value;
    this.queryActivities(ordering, title__icontains);
  }

  ngOnInit(): void {
    this.Form = this.fb.nonNullable.group({
      title__icontains: [''],
      ordering: ['created_at'],
    });
    this.queryActivities('created_at', '');
  }

  queryActivities(ordering: string, title__icontains: string) {
    this.isSubmitting = true;
    const params = new HttpParams()
      .set('title__icontains', title__icontains)
      .set('ordering', ordering);
    this.activityService.getAllActivities(params).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.isSubmitting = false;
      },
      error: (err) => {
        console.log(err);
        this.isSubmitting = false;
      },
    });
  }
}
