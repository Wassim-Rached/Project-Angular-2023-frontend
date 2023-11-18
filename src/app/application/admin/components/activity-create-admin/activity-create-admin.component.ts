import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/application/services/activity.service';

@Component({
  selector: 'app-activity-create-admin',
  templateUrl: './activity-create-admin.component.html',
  styleUrls: ['./activity-create-admin.component.css'],
})
export class ActivityCreateAdminComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      title: [''],
      photo: [null],
      isFree: [true],
      price: [''],
      maxParticipants: [''],
      date: [''],
      description: [''],
    });
  }
  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    const data = this.form.value;
    delete data.photo;
    console.log(data);
    this.activityService.createActivity(data).subscribe({
      next: (data) => {
        this.resetForm();
        alert('activity created successfully');
      },
      error: (error) => {
        alert('activity not created !! try again later');
      },
    });
  }
}
