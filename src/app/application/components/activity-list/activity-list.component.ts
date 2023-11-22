import { Component, OnInit } from '@angular/core';
import { Activity } from '../../classes/activity';
import { ActivityService } from '../../services/activity.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit {
  activities!: Activity[];
  Form!: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      title__icontains: [''],
    });

    this.queryActivities();
  }

  queryActivities(title__icontains: string = '') {
    this.isSubmitting = true;
    const params = new HttpParams().set('title__icontains', title__icontains);
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

  onSubmit() {
    const { title__icontains } = this.Form.value;
    this.queryActivities(title__icontains);
  }
}
