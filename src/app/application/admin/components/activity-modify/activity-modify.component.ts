import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/application/classes/activity';
import { ActivityService } from 'src/app/application/services/activity.service';

@Component({
  selector: 'app-activity-modify',
  templateUrl: './activity-modify.component.html',
  styleUrls: ['./activity-modify.component.css'],
})
export class ActivityModifyComponent implements OnInit {
  form!: FormGroup;
  activity!: Activity;
  activityId!: string;
  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params['activityId'];

    this.activityService.getActivityById(this.activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        this.initForm();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetForm() {
    this.form.reset();
  }

  initForm() {
    this.form = this.fb.nonNullable.group({
      title: [this.activity.title],
      photo: [null],
      is_free: [this.activity.is_free],
      price: [this.activity.price],
      maxParticipants: [this.activity.maxParticipants],
      date: [this.activity.date],
      description: [this.activity.description],
    });
  }

  onSubmit() {
    const data = this.form.value;
    delete data.photo;
    this.activityService.updateActivity(this.activityId, data).subscribe({
      next: (data) => {
        this.resetForm();
        alert('activity updated successfully');
        this.activityService.redirectAfterUpdate();
      },
      error: (error) => {
        alert('activity not updated !! try again later');
      },
    });
  }
}
